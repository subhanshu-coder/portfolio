import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

// =================================================================
// --- 1. LANYARD/CARD 3D COMPONENTS AND LOGIC ---
// =================================================================

// Floating 3D Card Component
function FloatingCard() {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Custom sine wave animation for rotation and vertical float
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.1 : 1}
      >
        {/* Main Card Body (White) */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[2, 2.8, 0.05]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={0.1}
            roughness={0.2}
            emissive="#00ffcc"
            emissiveIntensity={hovered ? 0.3 : 0.1}
          />
        </mesh>

        {/* Card Border Glow (Cyan) */}
        <mesh position={[0, 0, -0.03]}>
          <boxGeometry args={[2.1, 2.9, 0.02]} />
          <meshStandardMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={0.5}
            transparent
            opacity={0.8}
          />
        </mesh>

        {/* Decorative Elements on Card (Cyan) */}
        {/* Top Torus */}
        <mesh position={[0, 0.8, 0.03]}>
          <torusGeometry args={[0.3, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={1}
          />
        </mesh>

        {/* Center Sphere */}
        <mesh position={[0, 0, 0.03]}>
          <sphereGeometry args={[0.15, 32, 32]} />
          <meshStandardMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={1}
            metalness={0.8}
          />
        </mesh>

        {/* Bottom accent line */}
        <mesh position={[0, -0.8, 0.03]}>
          <boxGeometry args={[1.5, 0.05, 0.02]} />
          <meshStandardMaterial
            color="#00ffcc"
            emissive="#00ffcc"
            emissiveIntensity={1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Particle System Background
function Particles() {
  const particlesRef = useRef();
  const particleCount = 100;

  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00ffcc"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

// 3D Scene Component Wrapper
function Scene3D() {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '45%',
      height: '100%',
      zIndex: 1,
      pointerEvents: 'auto'
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0099ff" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1}
          color="#00ffcc"
        />
        
        <Particles />
        <FloatingCard />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          // Restricting rotation to keep the card centered vertically
          maxPolarAngle={Math.PI / 2} 
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}

// =================================================================
// --- 2. ABOUT 2D CONTENT COMPONENT (ADJUSTED) ---
// =================================================================

function AboutSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerStyle = {
    height: '150vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start', 
    padding: isMobile ? '60px 5%' : '80px 8%',
    
    // *** ADJUSTMENT: Set to a much smaller vh value to move content up ***
    paddingTop: isMobile ? '5vh' : '8vh', 
    
    position: 'relative',
    zIndex: 2,
    width: isMobile ? '100%' : '55%',
    
    // Keeps internal content scrollable to prevent page overflow
    overflowY: 'auto', 
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
    fontSize: isMobile ? '1rem' : '1.2rem',
    lineHeight: 1.8,
    marginBottom: '25px',
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: 300,
  };

  const highlightStyle = {
    color: '#00ffcc',
    fontWeight: 500,
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
        
      </div>
    </div>
  );
}

// =================================================================
// --- 3. MAIN EXPORT COMPONENT ---
// =================================================================

export default function Page() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Set the background color here to cover the whole screen
  const pageWrapperStyle = {
    width: '100%',
    height: '100vh',
    // Ensures the main page does not scroll
    overflow: 'hidden', 
    // Assuming a dark/black background for the portfolio
    background: '#0a0a0a', 
    position: 'relative',
  };

  return (
    <div style={pageWrapperStyle}>
      {/* 3D card scene is on the right (hidden on mobile) */}
      {!isMobile && <Scene3D />}
      
      {/* About content is on the left, now handles its own scrolling */}
      <AboutSection />
    </div>
  );
}