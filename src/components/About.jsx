/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, Text } from '@react-three/drei';
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

/* =========================
   1. MAIN PAGE EXPORT
   ========================= */

export default function AboutPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // === CHANGE IS HERE ===
  const pageWrapperStyle = {
    width: '100%',
    minHeight: '100vh',
    // 1. Dark semi-transparent background (70% opacity black)
    background: 'rgba(5, 5, 5, 0.7)', 
    // 2. Blur the moving beams behind this section
    backdropFilter: 'blur(12px)', 
    // 3. Add a subtle top border to create a "cut" between sections
    borderTop: '1px solid rgba(255, 255, 255, 0.1)', 
    position: 'relative',
    overflow: 'hidden',
    // 4. Add a shadow to make it feel like it's sitting on top
    boxShadow: '0 -10px 30px rgba(0,0,0,0.5)'
  };

  return (
    <div style={pageWrapperStyle}>
      {/* Right side 3D lanyard (hidden on mobile) */}
      {!isMobile && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '50%',
            height: '100%',
            zIndex: 1,
            pointerEvents: 'auto',
          }}
        >
          <LanyardCanvas />
        </div>
      )}

      {/* Left side About content */}
      <AboutSection />
    </div>
  );
}

// ... (Rest of the file remains exactly the same: LanyardCanvas, Band, ProceduralCard, AboutSection) ...
// You do not need to change the code below this line, just keep it as it was.
/* =========================
   2. 3D LANYARD CANVAS
   ========================= */

function LanyardCanvas() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 30], fov: 20 }}
      dpr={[1, isMobile ? 1.5 : 2]}
      gl={{ alpha: true }}
      onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
    >
      <ambientLight intensity={Math.PI} />
      <Physics gravity={[0, -40, 0]} timeStep={isMobile ? 1 / 30 : 1 / 60}>
        <Band isMobile={isMobile} />
      </Physics>

      <Environment blur={0.75}>
        <Lightformer
          intensity={2}
          color="white"
          position={[0, -1, 5]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[-1, -1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={3}
          color="white"
          position={[1, 1, 1]}
          rotation={[0, 0, Math.PI / 3]}
          scale={[100, 0.1, 1]}
        />
        <Lightformer
          intensity={10}
          color="white"
          position={[-10, 0, 14]}
          rotation={[0, Math.PI / 2, Math.PI / 3]}
          scale={[100, 10, 1]}
        />
      </Environment>
    </Canvas>
  );
}

/* =========================
   3. BAND + CARD (PHYSICS)
   ========================= */

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();

  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();

  const segmentProps = {
    type: 'dynamic',
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);

  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 0.75, 0],
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }

    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, ref.current.lerped.distanceTo(ref.current.translation()))
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });

      curve.points[0]
        .copy(j3.current.translation())
        .add(new THREE.Vector3(0, -0.01, 0));
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));

      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0.6, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0.3, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? 'kinematicPosition' : 'dynamic'}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <ProceduralCard
            isMobile={isMobile}
            hover={hover}
            drag={drag}
            dragged={dragged}
            vec={vec}
            card={card}
          />
        </RigidBody>
      </group>

      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="#ffffff"
          transparent
          opacity={0.8}
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={3}
        />
      </mesh>
    </>
  );
}

/* =========================
   4. BLACK BADGE CARD LOOK
   ========================= */

function ProceduralCard({ isMobile, hover, drag, dragged, vec, card }) {
  return (
    <group
      scale={2.4}
      position={[0, -1.2, -0.05]}
      onPointerOver={() => hover(true)}
      onPointerOut={() => hover(false)}
      onPointerUp={(e) => (e.target.releasePointerCapture(e.pointerId), drag(false))}
      onPointerDown={(e) => (
        e.target.setPointerCapture(e.pointerId),
        drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
      )}
    >
      <mesh>
        <boxGeometry args={[0.9, 1.45, 0.05]} />
        <meshPhysicalMaterial
          color="#ffffff"
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      <mesh position={[0, 0, -0.03]}>
        <boxGeometry args={[0.94, 1.49, 0.026]} />
        <meshStandardMaterial
          color="#e5e7eb"
          emissive="#e5e7eb"
          emissiveIntensity={0.45}
          transparent
          opacity={0.45}
        />
      </mesh>

      <mesh position={[0, 0.66, 0.035]}>
        <torusGeometry args={[0.02, 0.01, 16, 32]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.9} roughness={0.3} />
      </mesh>

      <mesh position={[0, 0.76, 0.03]}>
        <boxGeometry args={[0.35, 0.080, 0.02]} />
        <meshStandardMaterial color="#111111" />
      </mesh>

      <mesh position={[0, 0.66, 0.031]}>
        <circleGeometry args={[0.05, 24]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      <Text
        position={[-0.32, 0.28, 0.05]}
        fontSize={0.11}
        color="#111827"
        anchorX="left"
        anchorY="top"
        lineHeight={1.05}
      >
        SUBHANSHU
        {'\n'}
        PAL
      </Text>

      <mesh position={[-0.28, -0.53, 0.04]}>
        <circleGeometry args={[0.12, 32, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#111827" />
      </mesh>
      <mesh position={[-0.12, -0.53, 0.04]}>
        <circleGeometry args={[0.12, 32, Math.PI / 2, Math.PI]} />
        <meshStandardMaterial color="#111827" />
      </mesh>

      <Text
        position={[0.05, -0.55, 0.05]}
        fontSize={0.04}
        color="#6b7280"
        anchorX="left"
        anchorY="middle"
        letterSpacing={0.03}
      >
        ID  002 236 985
      </Text>
    </group>
  );
}

/* =========================
   5. ABOUT TEXT SECTION
   ========================= */

function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: isMobile ? '60px 5%' : '80px 8%',
    paddingTop: isMobile ? '5vh' : '8vh',
    position: 'relative',
    zIndex: 2,
    width: isMobile ? '100%' : '55%',
    overflowX: 'hidden',
  };

  const contentStyle = {
    maxWidth: '700px',
    fontFamily: "'Poppins', 'Inter', sans-serif",
    color: '#ffffff',
    paddingBottom: '50px',
  };

  const titleStyle = {
    fontSize: isMobile ? '2.5rem' : '4rem',
    fontWeight: 800,
    background: 'linear-gradient(135deg, #00ffcc 0%, #0099ff 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: '30px',
    lineHeight: 1.2,
  };

  const paragraphStyle = {
    fontSize: isMobile ? '1rem' : '1.15rem',
    lineHeight: 1.7,
    marginBottom: '22px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 300,
  };

  const highlightStyle = {
    color: '#00ffcc',
    fontWeight: 500,
  };

  const subTitleStyle = {
    fontSize: isMobile ? '1.1rem' : '1.2rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#00ffcc',
    marginTop: '32px',
    marginBottom: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={titleStyle}>About Me</h1>
        <p style={paragraphStyle}>
          Hello! I'm <span style={highlightStyle}>Subhanshu Pal</span>. I thought
          to be a developer until I discovered something more exciting: understanding why users
          click what they click. What started as a computer science degree became a fascination
          with human behavior and interface design.
        </p>

        <p style={paragraphStyle}>
          Turns out, I was meant to <span style={highlightStyle}>build bridges between people
          and technology</span>, not just write code. Today, I'm a full-stack developer who
          combines technical expertise with a deep passion for user experience—from crafting
          robust backend systems to designing intuitive interfaces.
        </p>

        <p style={paragraphStyle}>
          I thrive on transforming complex problems into elegant solutions across the entire stack.
          Whether I'm optimizing database queries, building scalable APIs, or perfecting pixel-perfect
          designs, every decision is driven by <span style={highlightStyle}>empathy</span> for the
          people who will use what I create.
        </p>
       
        <h3 style={subTitleStyle}>Right now</h3>
        <p style={paragraphStyle}>
          I'm focused on mastering the MERN stack, building real projects like Protonix.ai and
          refining my sense of product thinking—how things should look, feel and behave together.
        </p>

        {/* Minimal stats row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginTop: '10px',
          }}
        >
          <div style={tagStyle}>2+ yrs coding</div>
          <div style={tagStyle}>MERN stack</div>
          <div style={tagStyle}>3D & animations</div>
          <div style={tagStyle}>Protonix.ai</div>
        </div>
      </div>
    </div>
  );
}

const tagStyle = {
  padding: '6px 10px',
  borderRadius: '999px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.08)',
  fontSize: '0.8rem',
  color: '#fff',
};