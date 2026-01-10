import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import logo from "../assets/logo.png";
import githubIcon from "../assets/github.png";
import twitterIcon from "../assets/twitter.png";
import linkedinIcon from "../assets/linkedin.png";

import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Work", id: "work" }, // Changed from 'Works' to match image
  { label: "Skill", id: "skill" },
  { label: "Education", id: "education" },
  { label: "Get in touch", id: "contact" },
  { label: "FAQ", id: "Footer" }, // New Blog link
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleScrollTo = (id, label) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
      setActive(label);
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    const checkIfMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (!mobile && menuOpen) setMenuOpen(false);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuRef.current || !isMobile) return;
    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.5,
      ease: "power4.out",
    });
  }, [menuOpen, isMobile]);

  return (
    <nav
      className="navbar"
      style={{
        ...styles.navFloating,
        top: isVisible ? '5px' : '-100px',
        opacity: isVisible ? 1 : 0
      }}
    >
      <div className="navbar-logo" onClick={() => handleScrollTo("home", "Home")} style={{ cursor: 'pointer' }}>
        <img src={logo} alt="Logo" style={{ height: "20px" }} />
      </div>

      <ul className="navbar-links" style={{ display: isMobile ? 'none' : 'flex' }}>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleScrollTo(link.id, link.label)}
              style={{
                ...styles.navBtn,
                color: active === link.label ? "#111827" : "#6b7280",
                background: active === link.label ? "rgba(255,255,255,0.8)" : "transparent"
              }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Hamburger / Close Button */}
      <button
        className="navbar-hamburger"
        style={{ ...styles.hamburgerBtn, display: isMobile ? 'flex' : 'none' }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          <div className="hamburger-lines"><span /><span /><span /></div>
        ) : (
          <div className="close-circle-wrapper">
             {/* The "X" button from your image */}
            <div style={styles.closeBtn}>✕</div>
          </div>
        )}
      </button>

      {/* MOBILE PANEL */}
      {isMobile && (
        <div className="navbar-mobile-panel" ref={menuRef} style={styles.mobilePanel}>
          <div className="navbar-mobile-content" style={styles.mobileContent}>
            
            <div className="mobile-logo-top" style={styles.mobileLogoTop}>
              <img src={logo} alt="Logo" style={{ height: "5px" }} />
            </div>

            <ul className="navbar-mobile-links" style={styles.mobileUl}>
              {NAV_LINKS.map((link) => (
                <li key={link.label} style={{ marginBottom: "0px", textAlign: "center" }}>
                  <button
                    onClick={() => handleScrollTo(link.id, link.label)}
                    style={{
                      ...styles.mobileLinkBtn,
                      color: active === link.label ? "#00f2ea" : "#1a1a1a", // Cyan for active, Dark for others
                    }}
                  >
                    {link.label}
                  </button>
                  {/* Cyan Underline for active link */}
                  {active === link.label && <div style={styles.activeUnderline} />}
                </li>
              ))}
            </ul>

            <div className="navbar-footer" style={styles.mobileFooter}>
              <a href="https://github.com"><img src={githubIcon} alt="GH" style={styles.socialIcon} /></a>
              <a href="https://twitter.com"><img src={twitterIcon} alt="X" style={styles.socialIcon} /></a>
              <a href="https://linkedin.com"><img src={linkedinIcon} alt="IN" style={styles.socialIcon} /></a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

const styles = {
  navFloating: {
    position: 'fixed', left: '50%', transform: 'translateX(-50%)',
    width: '90%', maxWidth: '10500px', height: '50px',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '0 25px', zIndex: 3000,
    transition: 'top 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
    backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(15px)',
    borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  navBtn: { background: 'none', border: 'none', fontSize: '0.85rem', fontWeight: '600', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer' },
  
  // NEW MOBILE PANEL STYLES BASED ON IMAGE
  mobilePanel: {
    position: 'fixed', top: 0, right: 0, width: '100%', height: '100vh',
    background: '#88aca9', zIndex: 4000, transform: 'translateX(100%)', opacity: 0
  },
  mobileContent: {
    display: 'flex', flexDirection: 'column', height: '100%', padding: '40px 0', alignItems: 'center'
  },
  mobileLogoTop: { marginBottom: '20px' },
  mobileUl: { listStyle: 'none', padding: 0, margin: 0, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' },
  mobileLinkBtn: {
    background: 'none', border: 'none', 
    fontSize: '2rem', // Larger like the image
    fontStyle: 'italic', // Italic as per image
    fontWeight: '400', 
    cursor: 'pointer',
    fontFamily: 'serif' // Adjust to match your specific font
  },
  activeUnderline: {
    width: '60px', height: '3px', background: '#00f2ea', margin: '5px auto 0'
  },
  mobileFooter: { display: 'flex', gap: '25px', paddingBottom: '40px' },
  socialIcon: { height: '24px', width: 'auto', filter: 'none' }, // Original colors for socials
  
  hamburgerBtn: { background: 'none', border: 'none', zIndex: 5000, cursor: 'pointer' },
  closeBtn: {
    width: '40px', height: '40px', border: '1px solid #000', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem'
  }
};
