import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

// ==========================================
// 1. DATA
// ==========================================
const faqs = [
  {
    question: "As a fresher, how do you handle complex technical challenges?",
    answer: "I approach challenges with a structured mindset. I first break down the problem into smaller, manageable tasks, research official documentation, and look for best practices. If I get stuck, I’m not afraid to ask for guidance from mentors or utilize developer communities to ensure the project stays on track."
  },
  {
    question: "What is your preferred tech stack for new projects?",
    answer: "While I am flexible, I specialize in building high-performance applications using the MERN stack (MongoDB, Express, React, Node.js) and Next.js. For projects requiring high-end visuals, I integrate Three.js and Framer Motion. I always choose the tool that best fits the project’s specific performance and SEO needs."
  },
  {
    question: "What kind of projects are you most interested in working on?",
    answer: "I am particularly passionate about building interactive, user-centric web applications that solve real-world problems. I love working on projects where I can combine my design sensibilities with clean, efficient code, especially those involving AI integration or 3D web experiences."
  },
  {
    question: "Do you have experience working in a team environment?",
    answer: "Yes! During my studies and various hackathons, I’ve collaborated with other developers using Git/GitHub for version control. I value clear communication, peer code reviews, and the collective growth that comes from working within a dev team."
  }
];

// ==========================================
// 2. COMPONENTS
// ==========================================
const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div style={styles.faqItem}>
      <button onClick={onClick} style={styles.faqButton}>
        <span style={styles.questionText}>{question}</span>
        <motion.span 
            animate={{ rotate: isOpen ? 45 : 0 }}
            style={styles.icon}
        >
            +
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p style={styles.answerText}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==========================================
// 3. MAIN FOOTER
// ==========================================
export default function Footer() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div style={styles.footerWrapper}> {/* Wrapper to handle background alignment */}
      <footer style={styles.footerContainer}>
        
        {/* --- INTERACTIVE SHINY WATERMARK --- */}
        <motion.div 
          initial={{ opacity: 0.5 }}
          whileHover={{ opacity: 1, scale: 1.02 }}
          transition={{ duration: 0.8 }}
          style={styles.watermarkWrapper}
        >
          <h1 style={styles.watermarkText}>SUBHANSHU PAL</h1>
        </motion.div>

        <div style={styles.contentWrapper}>
          
          {/* FAQ SECTION */}
          <div style={styles.faqSection}>
              <div style={styles.faqTitleCol}>
                  <h2 style={styles.faqTitle}>
                      Frequently asked<br/>
                      <span style={{ color: "#6b7280" }}>project questions</span>
                  </h2>
              </div>
              <div style={styles.faqListCol}>
                  {faqs.map((faq, index) => (
                      <FAQItem 
                          key={index}
                          question={faq.question}
                          answer={faq.answer}
                          isOpen={openIndex === index}
                          onClick={() => toggleFAQ(index)}
                      />
                  ))}
              </div>
          </div>

          {/* DIVIDER */}
          <div style={styles.divider}></div>

          {/* LINKS SECTION */}
          <div style={styles.linksSection}>
              <div style={styles.linkCol}>
                  <h3 style={styles.colHeader}>EXPLORE</h3>
                  <a href="#home" style={styles.linkItem}>Home <span style={styles.arrow}>→</span></a>
                  <a href="#work" style={styles.linkItem}>Projects <span style={styles.arrow}>→</span></a>
              </div>

              <div style={styles.linkCol}>
                  <h3 style={styles.colHeader}>CONTACT</h3>
                  <a href="#contact" style={styles.linkItem}>Let's talk <span style={styles.arrow}>→</span></a>
                  <span 
                      style={{...styles.linkItem, cursor: "pointer"}}
                      onClick={() => {
                        navigator.clipboard.writeText("subhanshupal7@gmail.com");
                        alert("Email copied to clipboard!");
                      }}
                  >
                      Copy email
                  </span>
              </div>

              <div style={styles.linkCol}>
                  <h3 style={styles.colHeader}>CONNECT</h3>
                  <div style={styles.socialIcons}>
                      <motion.a whileHover={{ y: -5 }} href="https://github.com/subhanshu-coder" target="_blank" style={styles.socialLink}><FaGithub size={18}/></motion.a>
                      <motion.a whileHover={{ y: -5 }} href="https://www.linkedin.com/in/subhanshu-pal-9a6b73287/" target="_blank" style={styles.socialLink}><FaLinkedinIn size={18}/></motion.a>
                      <motion.a whileHover={{ y: -5 }} href="https://www.instagram.com/subhanshu_pal/?__pwa=1" target="_blank" style={styles.socialLink}><FaInstagram size={18}/></motion.a>
                      <motion.a whileHover={{ y: -5 }} href="https://x.com/PalSubhans70197" target="_blank" style={styles.socialLink}><FaTwitter size={18}/></motion.a>
                  </div>
              </div>
          </div>

          {/* --- CLEAN COPYRIGHT --- */}
          <div style={styles.copyrightRow}>
              <p style={styles.copyText}>© 2026 Subhanshu Pal. All rights reserved.</p>
              <div style={styles.legalLinks}>
                  <a href="#" style={styles.legalLink}>Privacy Policy</a>
                  <a href="#" style={styles.legalLink}>Legal Notice</a>
              </div>
          </div>

        </div>
      </footer>
    </div>
  );
}

// ==========================================
// 4. STYLES
// ==========================================
const styles = {
  footerWrapper: {
    backgroundColor: "transparent", // Keep this transparent to see the section behind the curve
    width: "100%",
    display: "flex",
    justifyContent: "center",
    position: "relative",
    zIndex: 20,
  },
  footerContainer: {
    width: "100%",
    position: "relative",
    backgroundColor: "#0a0a0a", 
    backgroundImage: `
        radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
        radial-gradient(at 50% 0%, hsla(225,39%,30%,0.05) 0, transparent 50%)
    `,
    /* --- THE CURVE LOGIC --- */
    borderTopLeftRadius: "50px", // High radius for the curve
    borderTopRightRadius: "50px",
    marginTop: "-30px", // This pulls the footer UP over the previous section
    padding: "150px 5% 40px 5%", // Extra top padding to account for the curve
    
    color: "#fff",
    fontFamily: "'Inter', sans-serif",
    overflow: "hidden", 
    display: "flex",
    flexDirection: "column",
    boxShadow: "0px -20px 50px rgba(0,0,0,0.5)", // Adds depth to the curve overlap
  },
  // ... rest of your styles stay the same
  contentWrapper: {
    maxWidth: "1200px",
    margin: "0 auto",
    width: "100%",
    position: "relative",
    zIndex: 10, 
  },
  watermarkWrapper: {
    position: "absolute",
    bottom: "0", 
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
    textAlign: "center",
    zIndex: 1, 
    pointerEvents: "none",
  },
  watermarkText: {
    fontSize: "10vw", 
    fontWeight: "900",
    lineHeight: "0.8",
    margin: 0,
    whiteSpace: "nowrap",
    textTransform: "uppercase",
    letterSpacing: "-0.04em",
    color: "transparent", 
    WebkitTextStroke: "1px rgba(255, 255, 255, 0.05)",
    background: "linear-gradient(to bottom, rgba(255,255,255,0.08) 0%, transparent 100%)",
    WebkitBackgroundClip: "text",
  },
  faqSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "80px",
  },
  faqTitleCol: { flex: "1 1 300px" },
  faqTitle: { fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: "600", lineHeight: "1.2", margin: 0 },
  faqListCol: { flex: "2 1 500px" },
  faqItem: { borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "20px 0" },
  faqButton: {
    width: "100%",
    background: "transparent",
    border: "none",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    padding: 0,
  },
  questionText: { color: "#fff", fontSize: "1.05rem", fontWeight: "500", textAlign: "left" },
  icon: { color: "#fff", fontSize: "1.4rem" },
  answerText: { color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.6", marginTop: "15px" },
  divider: { width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "60px" },
  linksSection: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "40px",
    marginBottom: "120px",
  },
  linkCol: { display: "flex", flexDirection: "column", gap: "15px", minWidth: "150px" },
  colHeader: { fontSize: "0.7rem", color: "#6b7280", letterSpacing: "2px", fontWeight: "700", marginBottom: "10px" },
  linkItem: { color: "#fff", textDecoration: "none", fontSize: "1rem", fontWeight: "500", display: "flex", alignItems: "center", gap: "8px" },
  arrow: { color: "#10b981" },
  socialIcons: { display: "flex", gap: "12px" },
  socialLink: { 
    width: "40px", 
    height: "40px", 
    background: "rgba(255,255,255,0.05)", 
    display: "flex", 
    alignItems: "center", 
    justifyContent: "center", 
    borderRadius: "10px", 
    color: "#fff", 
    border: "1px solid rgba(255,255,255,0.03)" 
  },
  copyrightRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    paddingTop: "40px",
  },
  copyText: { color: "#4b5563", fontSize: "0.8rem", margin: 0 },
  legalLinks: { display: "flex", gap: "25px" },
  legalLink: { color: "#4b5563", textDecoration: "none", fontSize: "0.8rem" },
};