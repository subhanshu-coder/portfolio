import React, { useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, OrbitControls } from "@react-three/drei";

// ==========================================
// 1. DATA (Unchanged)
// ==========================================
const skillsCategories = [
  {
    id: "mern",
    title: "MERN Stack",
    description: "My core development stack",
    color: "#00ffcc",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    ]
  },
  {
    id: "frontend",
    title: "Frontend Developer",
    description: "Crafting beautiful interfaces",
    color: "#3b82f6",
    skills: [
      { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
      { name: "Three.js", icon: "https://global.discourse-cdn.com/standard17/uploads/threejs/original/2X/e/e4f86d2200d2d35c30f7b1494e96b9595ebc2751.png" },
      { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
      { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
      { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    ]
  },
  {
    id: "backend",
    title: "Backend Developer",
    description: "Logic & server-side operations",
    color: "#a855f7",
    skills: [
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ]
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    description: "Design & Workflow",
    color: "#f59e0b",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
      { name: "Blender", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg" },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
    ]
  }
];

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const pageStyle = {
    minHeight: "100vh",
    width: "100%",
    position: "relative",
    background: "#050505",
    overflowX: "hidden",
  };

  const contentWrapperStyle = {
    position: "relative",
    zIndex: 10,
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: isMobile ? "80px 20px" : "100px 50px",
    boxSizing: "border-box",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "50px",
  };

  const titleStyle = {
    fontSize: isMobile ? "2.5rem" : "4rem",
    fontWeight: "800",
    color: "#fff",
    marginBottom: "10px",
    textShadow: "0 0 25px rgba(0, 255, 204, 0.4)",
  };

  const subtitleStyle = {
    fontSize: isMobile ? "1rem" : "1.2rem",
    color: "#00ffcc",
    fontWeight: "400",
    letterSpacing: "3px",
    textTransform: "uppercase",
  };

  const gridContainerStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
    gap: "30px",
    width: "100%",
    maxWidth: "1200px",
    marginBottom: "80px",
  };

  return (
    <div style={pageStyle}>
      {/* 3D Background */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <Canvas>
          <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
          <ambientLight intensity={0.5} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>

      <div style={contentWrapperStyle}>
        <div style={headerStyle}>
          <h1 style={titleStyle}>My Arsenal</h1>
          <span style={subtitleStyle}>Tech & Tools</span>
        </div>

        {/* Skills Grid */}
        <div style={gridContainerStyle}>
          {skillsCategories.map((category) => (
            <CategoryCard key={category.id} category={category} isMobile={isMobile} />
          ))}
        </div>

        {/* --- NEW: TERMINAL FOOTER --- */}
        <TerminalFooter isMobile={isMobile} />
        
        <div style={{ height: "50px" }} />
      </div>
    </div>
  );
}

// ==========================================
// 3. CATEGORY CARD & ITEMS (Unchanged)
// ==========================================
function CategoryCard({ category, isMobile }) {
  const [hover, setHover] = useState(false);
  const cardStyle = {
    background: "rgba(255, 255, 255, 0.03)",
    border: hover ? `1px solid ${category.color}` : "1px solid rgba(255, 255, 255, 0.08)",
    borderRadius: "24px",
    padding: "30px",
    backdropFilter: "blur(12px)",
    display: "flex",
    flexDirection: "column",
    transition: "all 0.4s ease",
    transform: hover ? "translateY(-5px)" : "translateY(0)",
    boxShadow: hover ? `0 10px 30px -10px ${category.color}40` : "0 10px 30px -10px rgba(0,0,0,0.3)",
    position: "relative",
    overflow: "hidden"
  };
  const skillsGridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", gap: "15px", marginTop: "20px" };
  const titleStyle = { fontSize: "1.5rem", fontWeight: "700", color: "#fff", display: "flex", alignItems: "center", gap: "10px" };
  const dotStyle = { width: "8px", height: "8px", borderRadius: "50%", background: category.color, boxShadow: `0 0 10px ${category.color}` };

  return (
    <div style={cardStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <div style={{ marginBottom: "10px" }}>
        <div style={titleStyle}><div style={dotStyle} />{category.title}</div>
        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.9rem", marginLeft: "18px", marginTop: "5px" }}>{category.description}</div>
      </div>
      <div style={skillsGridStyle}>
        {category.skills.map((skill, idx) => ( <SkillItem key={idx} skill={skill} color={category.color} /> ))}
      </div>
    </div>
  );
}

function SkillItem({ skill, color }) {
  const [hover, setHover] = useState(false);
  const itemStyle = {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "15px 10px", borderRadius: "12px",
    background: hover ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)",
    transition: "all 0.3s ease", cursor: "default"
  };
  const imgStyle = { width: "40px", height: "40px", objectFit: "contain", marginBottom: "10px", filter: hover ? "drop-shadow(0 0 5px rgba(255,255,255,0.5))" : "grayscale(0.4) brightness(0.8)", transition: "all 0.3s ease" };
  const textStyle = { fontSize: "0.8rem", color: hover ? color : "rgba(255,255,255,0.7)", fontWeight: "500", textAlign: "center" };
  return (
    <div style={itemStyle} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <img src={skill.icon} alt={skill.name} style={imgStyle} />
      <span style={textStyle}>{skill.name}</span>
    </div>
  );
}

// ==========================================
// 4. NEW: TERMINAL FOOTER (The "Cool" Ending)
// ==========================================
function TerminalFooter({ isMobile }) {
  const [lines, setLines] = useState([
    { text: "> INITIALIZING SKILL_CHECK...", color: "#fff" }
  ]);
  const [showButton, setShowButton] = useState(false);
  
  // This effect simulates the typing/loading of checks
  useEffect(() => {
    const sequence = [
      { text: "> CHECKING PRODUCTION_READINESS...", color: "#fff", delay: 800 },
      { text: "  [SUCCESS] DEPLOYED MULTIPLE FULL-STACK APPS", color: "#00ffcc", delay: 1600 },
      { text: "> ANALYZING LEARNING_PROTOCOL...", color: "#fff", delay: 2400 },
      { text: "  [SUCCESS] ADAPTABILITY SCORE: HIGH (FAST LEARNER)", color: "#00ffcc", delay: 3200 },
      { text: "> VERIFYING TEAM_SYNC...", color: "#fff", delay: 4000 },
      { text: "  [SUCCESS] AGILE & GIT WORKFLOWS ENABLED", color: "#00ffcc", delay: 4800 },
      { text: "> SYSTEM STATUS: READY FOR HIRE", color: "#f59e0b", delay: 5600 },
    ];

    let timeouts = [];

    sequence.forEach((line, index) => {
      const timeout = setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === sequence.length - 1) setShowButton(true);
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const terminalStyle = {
    background: "rgba(10, 10, 10, 0.9)",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "0",
    width: "100%",
    maxWidth: "800px",
    fontFamily: "'Courier New', Courier, monospace",
    marginTop: "40px",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
    overflow: "hidden",
    position: "relative"
  };

  const terminalHeader = {
    background: "#222",
    padding: "10px 15px",
    display: "flex",
    gap: "8px",
    borderBottom: "1px solid #333"
  };

  const dot = { width: "12px", height: "12px", borderRadius: "50%" };
  
  const contentStyle = {
    padding: "20px",
    minHeight: "200px",
    textAlign: "left"
  };

  const lineStyle = {
    marginBottom: "8px",
    fontSize: isMobile ? "0.85rem" : "1rem",
    lineHeight: "1.5",
    textShadow: "0 0 5px rgba(0,0,0,0.5)"
  };

  return (
    <div style={terminalStyle}>
      {/* Terminal Top Bar */}
      <div style={terminalHeader}>
        <div style={{...dot, background: "#ff5f56"}}></div>
        <div style={{...dot, background: "#ffbd2e"}}></div>
        <div style={{...dot, background: "#27c93f"}}></div>
        <div style={{marginLeft: "10px", color: "#888", fontSize: "0.8rem", fontFamily: "sans-serif"}}>
          developer_profile.exe
        </div>
      </div>

      {/* Terminal Content */}
      <div style={contentStyle}>
        {lines.map((line, i) => (
          <div key={i} style={{ ...lineStyle, color: line.color }}>
            {line.text}
          </div>
        ))}
        
        {/* Blinking Cursor */}
        <div style={{ color: "#00ffcc", marginTop: "10px", animation: "blink 1s infinite" }}>
          _
        </div>

        {/* Action Button that appears at the end */}
        {showButton && (
           <div style={{ marginTop: "30px", borderTop: "1px dashed #444", paddingTop: "20px", display: "flex", justifyContent: "center" }}>
             <a 
               href="mailto:subhanshupal7@gmail.com"
               style={{
                 background: "#00ffcc",
                 color: "#000",
                 padding: "12px 24px",
                 textDecoration: "none",
                 fontWeight: "bold",
                 borderRadius: "4px",
                 cursor: "pointer",
                 boxShadow: "0 0 15px rgba(0, 255, 204, 0.4)"
               }}
             >
               EXECUTE: CONTACT_ME()
             </a>
           </div>
        )}
      </div>

      {/* Inline styles for blink animation */}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
}