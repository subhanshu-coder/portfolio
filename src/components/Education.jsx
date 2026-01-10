import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import { motion } from "framer-motion";

// ==========================================
// 1. BACKGROUND COMPONENT
// ==========================================
function TechBackground() {
  const gridRef = useRef();

  useFrame((state) => {
    if (gridRef.current) {
        gridRef.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });

  return (
    <group>
      <fog attach="fog" args={['#050505', 5, 30]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00ffcc" />

      <group ref={gridRef}>
        <gridHelper args={[50, 50, 0x111111, 0x111111]} position={[0, -2, 0]} />
        <gridHelper args={[50, 10, 0x222222, 0x050505]} position={[0, -2.01, 0]} />
      </group>

      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
    </group>
  );
}

// ==========================================
// 2. BENTO CARD COMPONENT
// ==========================================
const BentoCard = ({ title, subTitle, children, delay = 0, colSpan = 1 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay }}
      style={{
        ...styles.card,
        gridColumn: `span ${colSpan}`,
      }}
    >
      <div style={styles.cardHeader}>
        <h3 style={styles.cardTitle}>{title}</h3>
        {subTitle && <span style={styles.cardSub}>{subTitle}</span>}
      </div>
      <div style={styles.cardBody}>{children}</div>
      <div style={styles.cornerAccent} />
    </motion.div>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function Education() {
  return (
    <div style={styles.pageWrapper}>
      
      <div style={styles.canvasContainer}>
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={60} />
          <TechBackground />
        </Canvas>
      </div>

      <div style={styles.contentContainer}>
        
        <div style={styles.header}>
          <h2 style={styles.sectionLabel}>SYSTEM SPECS</h2>
          <h1 style={styles.mainTitle}>Academic <span style={{color: "#00ffcc"}}>Dashboard</span></h1>
        </div>

        <div style={styles.bentoGrid}>
          {/* 1. DEGREE */}
          <BentoCard title="Bachelor of Science" subTitle="Information Technology" colSpan={2} delay={0.1}>
            <p style={styles.text}>
              A comprehensive study of software engineering principles. Focusing on theoretical architecture, Object-Oriented Programming (OOP), and System Design.
            </p>
            <div style={styles.tagRow}>
              <span style={styles.tag}>System Design</span>
              <span style={styles.tag}>OOP</span>
              <span style={styles.tag}>Web Arch</span>
            </div>
          </BentoCard>

          {/* 2. COLLEGE */}
          <BentoCard title="Institution" subTitle="St. Rock's College" colSpan={1} delay={0.2}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", height: "100%" }}>
              <div style={styles.iconBig}>🏛️</div>
              <p style={styles.text}>
                <strong>Location:</strong> Mumbai, India<br/>
                <br/>
                Moving from basic syntax to full-scale application development.
              </p>
            </div>
          </BentoCard>

          {/* 3. STATUS */}
          <BentoCard title="Status" subTitle="Year 3/3" colSpan={1} delay={0.3}>
            <div style={styles.progressContainer}>
              <div style={styles.progressLabel}>
                <span>Completion</span>
                <span>80%</span>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: "80%"}}></div>
              </div>
              <p style={{...styles.text, fontSize: "0.8rem", marginTop: "15px"}}>
                Final Phase: Capstone Projects
              </p>
            </div>
          </BentoCard>

          {/* 4. MODULES */}
          <BentoCard title="Core Modules" subTitle="Technical Stack" colSpan={2} delay={0.4}>
             <ul style={styles.moduleGrid}>
               <li style={styles.moduleItem}>✓ Data Structures & Algorithms</li>
               <li style={styles.moduleItem}>✓ Advanced Java & Backend</li>
               <li style={styles.moduleItem}>✓ Database Management (SQL)</li>
               <li style={styles.moduleItem}>✓ Green Computing</li>
               <li style={styles.moduleItem}>✓ Artificial Intelligence</li>
               <li style={styles.moduleItem}>✓ IoT Fundamentals</li>
             </ul>
          </BentoCard>
        </div>

        {/* --- FOOTER SECTION --- */}
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={styles.footerContainer}
        >
            <div style={styles.footerGlass}>
                <div style={styles.footerInfo}>
                    <span style={{color: "#888", fontSize: "0.8rem", letterSpacing: "2px", display: "block"}}>ACADEMIC LOG</span>
                    <span style={{color: "#fff", fontWeight: "bold"}}>Verified</span>
                </div>

                {/* --- GITHUB BUTTON LINK --- */}
                <motion.a 
                    href="https://github.com/subhanshu-coder/portfolio" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, backgroundColor: "#00ffcc", color: "#000", boxShadow: "0 0 20px rgba(0,255,204,0.5)" }}
                    whileTap={{ scale: 0.95 }}
                    style={styles.githubButton}
                >
                   <span>View Source Code</span>
                   <span style={{ fontSize: "1.2rem" }}>↗</span>
                </motion.a>
            </div>
        </motion.div>

      </div>
    </div>
  );
}

// ==========================================
// 4. STYLES
// ==========================================
const styles = {
  pageWrapper: { position: "relative", width: "100%", minHeight: "100vh", background: "#050505", fontFamily: "'Inter', sans-serif", display: "flex", justifyContent: "center", alignItems: "center" },
  canvasContainer: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 },
  contentContainer: { position: "relative", zIndex: 10, width: "100%", maxWidth: "1000px", padding: "40px 20px" },
  header: { marginBottom: "40px", borderLeft: "4px solid #00ffcc", paddingLeft: "20px" },
  sectionLabel: { color: "#888", letterSpacing: "4px", fontSize: "0.9rem", marginBottom: "5px" },
  mainTitle: { fontSize: "3rem", fontWeight: "800", color: "#fff", lineHeight: "1" },
  
  bentoGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", width: "100%" },
  card: { background: "rgba(20, 20, 20, 0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "16px", padding: "25px", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", transition: "transform 0.3s ease" },
  cardHeader: { marginBottom: "15px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "10px" },
  cardTitle: { fontSize: "1.2rem", fontWeight: "bold", color: "#fff", marginBottom: "5px" },
  cardSub: { fontSize: "0.9rem", color: "#00ffcc", fontWeight: "500" },
  cardBody: { flex: 1 },
  text: { color: "#8892b0", fontSize: "0.95rem", lineHeight: "1.6" },
  cornerAccent: { position: "absolute", bottom: "0", right: "0", width: "20px", height: "20px", borderBottom: "2px solid #00ffcc", borderRight: "2px solid #00ffcc", borderBottomRightRadius: "16px", opacity: 0.5 },
  
  tagRow: { display: "flex", gap: "10px", marginTop: "15px", flexWrap: "wrap" },
  tag: { fontSize: "0.8rem", padding: "5px 12px", borderRadius: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc" },
  iconBig: { fontSize: "2.5rem", marginBottom: "10px" },
  progressContainer: { marginTop: "auto" },
  progressLabel: { display: "flex", justifyContent: "space-between", fontSize: "0.85rem", color: "#ccc", marginBottom: "8px" },
  progressBar: { width: "100%", height: "8px", background: "#333", borderRadius: "4px", overflow: "hidden" },
  progressFill: { height: "100%", background: "#00ffcc", boxShadow: "0 0 10px #00ffcc" },
  moduleGrid: { listStyle: "none", padding: 0, margin: 0, display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" },
  moduleItem: { fontSize: "0.9rem", color: "#ccc", background: "rgba(255,255,255,0.02)", padding: "8px", borderRadius: "6px" },

  footerContainer: { marginTop: "60px", width: "100%" },
  footerGlass: { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "100px", padding: "15px 30px", display: "flex", justifyContent: "space-between", alignItems: "center", backdropFilter: "blur(10px)" },
  footerInfo: { display: "flex", flexDirection: "column", lineHeight: "1.2" },
  
  // GITHUB BUTTON STYLE
  githubButton: {
    minWidth: "180px",
    height: "50px",
    background: "#00ffcc",
    color: "#000",
    borderRadius: "50px",
    fontWeight: "bold",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    textDecoration: "none", // Removes underline from link
    cursor: "pointer",
    transition: "transform 0.2s, box-shadow 0.2s",
  }
};