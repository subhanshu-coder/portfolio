import React, { useState, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, ContactShadows } from "@react-three/drei";

// ==========================================
// 1. PROJECT DATA
// ==========================================
const projects = [
  {
    id: 1,
    title: "Protonix.ai",
    category: "AI",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000",
    description: "A unified AI chatbot aggregation platform built with the MERN stack.",
    tech: ["React", "Node.js", "OpenAI API"],
    demoLink: "https://subhanshu-coder.github.io/protonix.ai/", 
    repoLink: "https://github.com/subhanshu-coder/protonix.ai"
  },
  {
    id: 2,
    title: "3D Portfolio",
    category: "3D",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000",
    description: "Interactive portfolio featuring React Three Fiber and physics-based animations.",
    tech: ["R3F", "Three.js", "React"],
    demoLink: "#",
    repoLink: "https://github.com/subhanshu-coder/portfolio"
  },
  {
    id: 3,
    title: "Global Currency Converter",
    category: "Web apps",
    image: "https://images.unsplash.com/photo-1611974765270-ca1258634369?auto=format&fit=crop&q=80&w=1000",
    description: "Real-time exchange rate tool with historical data charts.",
    tech: ["React", "Forex API", "Recharts"],
    demoLink: "https://subhanshu-coder.github.io/ProXhange/",
    repoLink: "https://github.com/subhanshu-coder/ProXhange"
  }
];

// ==========================================
// 2. 3D SHAPE FOR FOOTER
// ==========================================
function HologramShape() {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.4;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={2.2}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial 
          color="#00ffcc" 
          wireframe={true}
          emissive="#00ffcc"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

// ==========================================
// 3. MAIN WORK COMPONENT
// ==========================================
export default function Work() {
  const [filter, setFilter] = useState("All");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(p => p.category === filter);

  // --- STYLES ---
const containerStyle = {
  minHeight: "100vh",
  width: "100%",
  // Background
  backgroundColor: "#c4d6d3ff", 
  backgroundImage: `repeating-linear-gradient(
      45deg,
      transparent,
      transparent 190px,
      rgba(101, 98, 98, 0.03) 300px,
      rgba(116, 114, 114, 0.03) 45px
    )`,
  // Corrected Padding logic
  paddingTop: isMobile ? "80px" : "100px",
  paddingLeft: isMobile ? "20px" : "10%",
  paddingRight: isMobile ? "20px" : "10%",
  paddingBottom: "120px", // Now this is the ONLY property setting the bottom padding
  
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  zIndex: 10, 
};

  const headerStyle = {
    textAlign: "center",
    marginBottom: "60px",
    maxWidth: "800px",
  };

  const titleStyle = {
    fontSize: isMobile ? "3rem" : "5rem",
    fontWeight: "800",
    marginBottom: "15px",
    color: "#111827", 
    letterSpacing: "-0.03em",
  };

  const gradientTextStyle = {
    background: "linear-gradient(135deg, #14966bff 0%, #92FE9D 100%)", 
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    display: "inline-block"
  };

  const subtitleStyle = {
    fontSize: isMobile ? "1rem" : "1.2rem",
    color: "#4c4c55ff", 
    fontWeight: "400",
    lineHeight: "1.6",
  };

  const filterContainerStyle = {
    display: "flex",
    gap: "10px",
    marginBottom: "80px",
    flexWrap: "wrap",
    justifyContent: "center",
    background: "#fff",
    padding: "8px",
    borderRadius: "50px",
    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.08)", 
    border: "1px solid #e5e7eb"
  };

  const getButtonStyle = (category) => ({
    padding: "10px 28px",
    borderRadius: "40px",
    border: "none",
    background: filter === category ? "#111827" : "transparent",
    color: filter === category ? "#fff" : "#4b5563",
    fontSize: "0.95rem",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontWeight: "600",
    outline: "none",
  });

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "40px",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "120px"
  };

  const footerSectionStyle = {
    width: "100%",
    maxWidth: "1000px",
    background: "#111827", 
    borderRadius: "30px",
    padding: isMobile ? "40px" : "60px",
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    boxShadow: "0 20px 50px -12px rgba(0, 0, 0, 0.25)"
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={titleStyle}>
          Selected Work
        </h1>
        <p style={subtitleStyle}>
          A curated collection of projects exploring <br/>
          the intersection of <strong>AI</strong>, <strong>Design</strong>, and <strong>Engineering</strong>.
        </p>
      </div>

      <div style={filterContainerStyle}>
        {["All", "AI", "3D", "Web apps"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={getButtonStyle(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={gridStyle}>
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* ======================================================= */}
      {/* 3D CTA FOOTER                                           */}
      {/* ======================================================= */}
      <div style={footerSectionStyle}>
        <div style={{ flex: 1, zIndex: 2, textAlign: isMobile ? "center" : "left", marginBottom: isMobile ? "30px" : "0" }}>
          <h2 style={{ color: "#fff", fontSize: isMobile ? "2rem" : "3rem", margin: "0 0 10px 0", fontWeight: "800" }}>
            Start a Project?
          </h2>
          <p style={{ color: "#9ca3af", fontSize: "1.1rem", maxWidth: "400px" }}>
            Let's turn your ideas into reality. Click the button to send me an email directly.
          </p>
          
          <button 
            onClick={() => window.location.href = "mailto:subhanshupal7@gmail.com"}
            style={{
              marginTop: "25px",
              padding: "16px 40px",
              fontSize: "1rem",
              background: "#5abda9ff",
              color: "#000",
              border: "none",
              borderRadius: "50px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          >
            Let's Talk
          </button>
        </div>

        {/* 3D Canvas Area */}
        <div style={{ width: isMobile ? "200px" : "300px", height: isMobile ? "200px" : "300px", position: "relative" }}>
           <Canvas camera={{ position: [0, 0, 5] }} gl={{ alpha: true }}>
             <ambientLight intensity={0.5} />
             <pointLight position={[10, 10, 10]} />
             <HologramShape />
             <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2.5} far={4} color="#00ffcc" />
           </Canvas>
        </div>
      </div>

    </div>
  );
}

// ==========================================
// 4. CLEAN CARD COMPONENT (Projects)
// ==========================================
function ProjectCard({ project }) {
  const [hover, setHover] = useState(false);

  const cardStyle = {
    position: "relative",
    borderRadius: "24px",
    overflow: "hidden",
    background: "#ffffff",
    boxShadow: hover 
      ? "0 25px 50px -12px rgba(0, 0, 0, 0.15)" 
      : "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
    transform: hover ? "translateY(-8px)" : "translateY(0)",
    transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
    border: "1px solid #f3f4f6",
    height: "auto",
    minHeight: "520px", 
    display: "flex",
    flexDirection: "column",
  };

  const imageContainerStyle = {
    height: "260px",
    width: "100%",
    overflow: "hidden",
    position: "relative",
    background: "#f3f4f6"
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.7s ease",
    transform: hover ? "scale(1.05)" : "scale(1.0)",
  };

  const contentStyle = {
    padding: "32px",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const tagStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "rgba(255, 255, 255, 0.95)",
    color: "#000",
    padding: "8px 16px",
    borderRadius: "100px",
    fontSize: "0.75rem",
    fontWeight: "700",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
    zIndex: 2,
  };

  return (
    <div 
      style={cardStyle} 
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div style={imageContainerStyle}>
        <img src={project.image} alt={project.title} style={imgStyle} />
        <span style={tagStyle}>{project.category}</span>
      </div>
      
      <div style={contentStyle}>
        <div>
          <h3 style={{ margin: "0 0 12px 0", color: "#111827", fontSize: "1.5rem", fontWeight: "700" }}>
            {project.title}
          </h3>
          <p style={{ margin: 0, color: "#4b5563", fontSize: "1rem", lineHeight: "1.6" }}>
            {project.description}
          </p>

          <div style={{ display: "flex", gap: "8px", marginTop: "24px", flexWrap: "wrap" }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                fontSize: "0.8rem",
                color: "#4b5563",
                background: "#f3f4f6",
                padding: "6px 12px",
                borderRadius: "8px",
                fontWeight: "600",
                border: "1px solid #e5e7eb"
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
        
        <div style={{ display: "flex", gap: "12px", marginTop: "25px" }}>
          <a 
            href={project.demoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: "12px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "600",
              background: "#111827", 
              color: "#fff",
              transition: "opacity 0.2s"
            }}
            onMouseEnter={(e) => e.target.style.opacity = "0.8"}
            onMouseLeave={(e) => e.target.style.opacity = "1"}
          >
            Live Demo ↗
          </a>
          <a 
            href={project.repoLink} 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              flex: 1,
              padding: "12px 0",
              borderRadius: "12px",
              textAlign: "center",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontWeight: "600",
              background: "transparent",
              color: "#374151",
              border: "1px solid #d1d5db"
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#f9fafb";
              e.target.style.color = "#111";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#374151";
            }}
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}