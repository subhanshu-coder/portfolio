import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Sphere, MeshDistortMaterial, Environment, Lightformer } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";

// ==========================================
// 1. BACKGROUND: LIQUID SPHERE
// ==========================================
function LiquidStudio() {
  return (
    <group>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere args={[2.4, 128, 128]} position={[3, 0, -2]}>
           <MeshDistortMaterial 
             color="#ffffff" 
             envMapIntensity={1.5} 
             clearcoat={1} 
             clearcoatRoughness={0.1} 
             metalness={0.9} 
             roughness={0.1}
             distort={0.4} 
             speed={2}     
           />
        </Sphere>
      </Float>

      <Environment resolution={512}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="circle" intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={2} />
          <Lightformer form="rect" intensity={2} rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[10, 1, 1]} />
        </group>
      </Environment>
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
    </group>
  );
}

// ==========================================
// 2. CONTACT FORM
// ==========================================
const ContactForm = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [buttonText, setButtonText] = useState("EXECUTE UPLINK");

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonText("UPLOADING...");
    setTimeout(() => {
      setButtonText("DATA SECURED");
      setFormState({ name: "", email: "", message: "" });
      setTimeout(() => setButtonText("EXECUTE UPLINK"), 3000);
    }, 2000);
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputWrapper}>
            <input 
              type="text" 
              name="name" 
              placeholder="IDENTITY / ORG" 
              value={formState.name}
              onChange={handleChange}
              style={styles.minimalInput} 
              required
            />
        </div>

        <div style={styles.inputWrapper}>
            <input 
              type="email" 
              name="email" 
              placeholder="SECURE FREQUENCY (EMAIL)" 
              value={formState.email}
              onChange={handleChange}
              style={styles.minimalInput} 
              required
            />
        </div>

        <div style={styles.inputWrapper}>
            <textarea 
              name="message" 
              placeholder="MISSION BRIEF..." 
              value={formState.message}
              onChange={handleChange}
              style={styles.minimalTextarea} 
              rows="3"
              required
            />
        </div>

        <motion.button 
            whileHover={{ scale: 1.02, backgroundColor: "#333" }}
            whileTap={{ scale: 0.98 }}
            style={styles.submitBtn}
            type="submit"
        >
            {buttonText}
        </motion.button>
    </form>
  );
};

// ==========================================
// 3. MAIN COMPONENT
// ==========================================
export default function Contact() {
  const [time, setTime] = useState("");

  // --- CURSOR LOGIC ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth Physics (Stiffness 500 = snappy but smooth)
  const glowSpring = { damping: 30, stiffness: 500 }; 
  const glowX = useSpring(mouseX, glowSpring);
  const glowY = useSpring(mouseY, glowSpring);

  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setTime(timeString);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.pageWrapper} id="contact">
      
      {/* --- COLOR SPOT (Following Mouse) --- */}
      <motion.div
        style={{ translateX: glowX, translateY: glowY, ...styles.cursorSpot }}
      />

      {/* 3D LAYER */}
      <div style={styles.canvasContainer}>
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ alpha: true }}>
          <LiquidStudio />
        </Canvas>
      </div>

      {/* CONTENT LAYER */}
      <div style={styles.flexContainer}>
        <div style={styles.gridLayout}>
            
            {/* LEFT SIDE */}
            <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={styles.leftPanel}
            >
                <div style={styles.headerGroup}>
                    <h2 style={styles.subLabel}>04 // TERMINAL</h2>
                    <h1 style={styles.heroTitle}>LET'S TALK</h1>
                    <div style={styles.divider}></div>
                    
                    <p style={styles.heroSub}>
                        Tell me about your Webflow project, and let’s see how we can work together. 
                        I usually reply fast, and at the latest, within 24 hours.
                    </p>
                </div>
                
                <div style={styles.contactDetails}>
                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>EMAIL UPLINK</span>
                        <a href="mailto:subhanshupal7@gmail.com" style={styles.detailLink}>
                            subhanshupal7@gmail.com
                        </a>
                    </div>

                    <div style={styles.detailItem}>
                        <span style={styles.detailLabel}>WHATSAPP / MSG</span>
                        <a 
                            href="https://wa.me/919307026076" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            style={styles.detailLink}
                        >
                            +91 93070 26076 ↗
                        </a>
                    </div>
                </div>

                <div style={styles.systemStatus}>
                     <div style={styles.statusItemLeft}>
                        <div style={styles.led}></div>
                        <span style={styles.statusText}>MUMBAI, INDIA</span>
                     </div>
                     <div style={styles.statusItemRight}>
                        <span style={styles.statusText}>IST:</span>
                        <span style={styles.timeText}>{time}</span>
                     </div>
                </div>
            </motion.div>

            {/* RIGHT SIDE: GLASS CARD */}
            <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                style={styles.rightPanelGlass} 
            >
                <div style={{ width: "100%", marginBottom: "20px", textAlign: "left" }}>
                     <p style={{ color: "#374151", fontSize: "0.9rem", fontStyle: "italic", lineHeight: "1.5" }}>
                         Don’t like forms?<br/> 
                         <a href="mailto:subhanshupal7@gmail.com" style={{ color: "#111", textDecoration: "underline", cursor: "pointer", fontWeight: "600" }}>
                            Feel free to email me anytime.
                         </a>
                     </p>
                </div>

                <ContactForm />
            </motion.div>

        </div>
      </div>
    </div>
  );
}

// ==========================================
// 4. STYLES
// ==========================================
const styles = {
  // --- COLOR SPOT STYLE ---
  // No border radius, just a soft gradient blob
  cursorSpot: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "30px", // Size of the glow area
    height: "30px",
    // Radial gradient creates the "color spot" without hard edges
    background: "radial-gradient(circle, rgba(18, 228, 126, 1) 0%, rgba(255,255,255,0) 70%)",
    pointerEvents: "none",
    zIndex: 9999,
    // Add blur to blend it perfectly into the page
    filter: "blur(10px)",
    marginTop: "-40px", // Center on mouse
    marginLeft: "-40px",
    mixBlendMode: "multiply", // Blends nicely into the background color
  },

  pageWrapper: {
    position: "relative",
    width: "100%",
    minHeight: "100vh",
    backgroundColor: "#c4d6d3ff", 
    backgroundImage: `repeating-linear-gradient(
        45deg,
        transparent,
        transparent 190px,
        rgba(101, 98, 98, 0.03) 300px,
        rgba(116, 114, 114, 0.03) 45px
    )`,
    fontFamily: "'Inter', sans-serif",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
    cursor: "auto", // NATIVE CURSOR VISIBLE
  },
  
  canvasContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0,
    pointerEvents: "none",
  },

  flexContainer: {
    position: "relative",
    zIndex: 10,
    width: "100%",
    maxWidth: "1100px",
  },

  gridLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },

  // --- LEFT PANEL ---
  leftPanel: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  subLabel: {
    fontSize: "0.8rem",
    letterSpacing: "4px",
    color: "#5abda9ff", 
    marginBottom: "15px",
    fontWeight: "700",
    fontFamily: "monospace",
  },
  heroTitle: {
    fontSize: "5rem", 
    fontWeight: "900",
    color: "#111827", 
    margin: 0,
    letterSpacing: "-2px",
    lineHeight: "0.9",
  },
  divider: {
    width: "60px",
    height: "3px",
    background: "#111827",
    margin: "30px 0",
    opacity: 0.8,
  },
  heroSub: {
    fontSize: "1.1rem",
    color: "#4b5563",
    lineHeight: "1.6",
    maxWidth: "450px",
    fontWeight: "500",
  },
  
  contactDetails: {
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  detailItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  },
  detailLabel: {
    fontSize: "0.7rem",
    color: "#6b7280",
    letterSpacing: "2px",
    fontWeight: "bold",
    fontFamily: "monospace",
  },
  detailLink: {
    color: "#111827",
    textDecoration: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "color 0.2s",
    cursor: "pointer",
  },

  systemStatus: {
    marginTop: "50px",
    padding: "15px 20px",
    border: "1px solid rgba(0,0,0,0.1)",
    borderRadius: "12px",
    display: "flex",
    justifyContent: "space-between", 
    alignItems: "center",
    background: "rgba(255,255,255,0.3)",
    maxWidth: "400px",
  },
  statusItemLeft: { display: "flex", alignItems: "center", gap: "10px" },
  statusItemRight: { display: "flex", alignItems: "center", gap: "10px", textAlign: "right" },
  statusText: { color: "#6b7280", fontSize: "0.8rem", fontFamily: "monospace", letterSpacing: "1px", fontWeight: "600" },
  timeText: { color: "#111827", fontSize: "0.8rem", fontFamily: "monospace", letterSpacing: "1px", fontWeight: "bold" },
  led: { width: "8px", height: "8px", background: "#10b981", borderRadius: "50%", boxShadow: "0 0 5px #10b981" },

  // --- RIGHT PANEL ---
  rightPanelGlass: {
    background: "rgba(255, 255, 255, 0.45)", 
    backdropFilter: "blur(20px)",            
    WebkitBackdropFilter: "blur(20px)",      
    border: "1px solid rgba(255, 255, 255, 0.6)", 
    padding: "50px",
    borderRadius: "30px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "25px",
  },
  inputWrapper: { position: "relative" },
  minimalInput: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.6)", 
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "18px",
    color: "#111827",
    fontSize: "0.95rem",
    borderRadius: "12px",
    outline: "none",
    transition: "all 0.3s",
    fontWeight: "500",
    letterSpacing: "1px",
    cursor: "text",
  },
  minimalTextarea: {
    width: "100%",
    background: "rgba(255, 255, 255, 0.6)",
    border: "1px solid rgba(0,0,0,0.1)",
    padding: "18px",
    color: "#111827",
    fontSize: "0.95rem",
    borderRadius: "12px",
    outline: "none",
    resize: "none",
    transition: "all 0.3s",
    fontFamily: "'Inter', sans-serif",
    fontWeight: "500",
    letterSpacing: "1px",
    cursor: "text",
  },
  
  submitBtn: {
    marginTop: "10px",
    background: "#000000",
    border: "none",
    color: "#ffffff",
    padding: "20px",
    fontSize: "0.9rem",
    fontWeight: "bold",
    letterSpacing: "2px",
    cursor: "pointer",
    borderRadius: "12px",
    transition: "transform 0.2s ease, background 0.2s ease",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  }
};