import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import logo from "../assets/logo.png";
import githubIcon from "../assets/github.png";
import twitterIcon from "../assets/twitter.png";
import linkedinIcon from "../assets/linkedin.png";

import "./Navbar.css";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skill", href: "#skill" },
  { label: "Get in touch", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState(NAV_LINKS[0].label);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const menuRef = useRef(null);

  // Enhanced mobile detection
  useEffect(() => {
    const checkIfMobile = () => {
      const width = window.innerWidth;
      const mobile = width <= 900;
      setIsMobile(mobile);
      
      // Close menu when switching to desktop
      if (!mobile && menuOpen) {
        setMenuOpen(false);
      }
    };

    // Initial check
    checkIfMobile();

    // Listen to all possible resize triggers
    window.addEventListener("resize", checkIfMobile);
    window.addEventListener("orientationchange", checkIfMobile);

    // Polling fallback for DevTools device toggle
    const interval = setInterval(checkIfMobile, 100);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
      window.removeEventListener("orientationchange", checkIfMobile);
      clearInterval(interval);
    };
  }, [menuOpen]);

  // Animate mobile menu
  useEffect(() => {
    if (!menuRef.current || !isMobile) return;
    
    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.44,
      ease: "power2.out",
    });
  }, [menuOpen, isMobile]);

  function handleLinkClick(label) {
    setActive(label);
    setMenuOpen(false);
  }

  function handleLogoClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      {/* Logo - Always visible */}
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop Navigation - Hidden on mobile */}
      <ul className="navbar-links" style={{ display: isMobile ? 'none' : 'flex' }}>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className={active === link.label ? "active" : ""}
              onClick={() => setActive(link.label)}
            >
              {link.label}
              {active === link.label && <span className="underline" />}
            </a>
          </li>
        ))}
      </ul>

      {/* Hamburger - Only visible on mobile */}
      <button
        className="navbar-hamburger"
        style={{ display: isMobile ? 'flex' : 'none' }}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {!menuOpen ? (
          <div className="hamburger-lines">
            <span />
            <span />
            <span />
          </div>
        ) : (
          <div className="close-circle">
            <div className="close-x" />
          </div>
        )}
      </button>

      {/* Mobile Menu Panel */}
      {isMobile && (
        <div 
          className="navbar-mobile-panel" 
          ref={menuRef}
          style={{
            transform: 'translateX(100%)',
            opacity: 0,
            pointerEvents: menuOpen ? 'auto' : 'none'
          }}
        >
          <div className="navbar-mobile-content">
            <div className="mobile-logo" onClick={handleLogoClick}>
              <img src={logo} alt="Logo" />
            </div>

            <ul className="navbar-mobile-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={active === link.label ? "active" : ""}
                    onClick={() => handleLinkClick(link.label)}
                  >
                    {link.label}
                    {active === link.label && <span className="underline" />}
                  </a>
                </li>
              ))}
            </ul>

            <div className="navbar-footer">
              <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer">
                <img src={githubIcon} alt="GitHub" />
              </a>
              <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer">
                <img src={twitterIcon} alt="Twitter" />
              </a>
              <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer">
                <img src={linkedinIcon} alt="LinkedIn" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}