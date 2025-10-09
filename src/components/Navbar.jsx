import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";

import logo from "../assets/logo.png"; // Your actual logo path
import githubIcon from "../assets/github.png"; // Provide appropriate icon paths
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 900);

  const menuRef = useRef(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 900);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Animate menu open/close
  useEffect(() => {
    if (!menuRef.current) return;
    gsap.to(menuRef.current, {
      x: menuOpen ? 0 : "100%",
      opacity: menuOpen ? 1 : 0,
      duration: 0.44,
      ease: "power2.out",
      pointerEvents: menuOpen ? "auto" : "none",
    });
  }, [menuOpen]);

  function handleLinkClick(label) {
    setActive(label);
    if (isMobile) setMenuOpen(false);
  }

  function handleLogoClick() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (isMobile) setMenuOpen(false);
  }

  return (
    <nav className="navbar">
      {/* Desktop Logo */}
      <div className="navbar-logo" onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        <img src={logo} alt="Logo" />
      </div>

      {/* Desktop Links */}
      {!isMobile && (
        <ul className="navbar-links">
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
      )}

      {/* Hamburger button for mobile */}
      {isMobile && (
        <button
          className="navbar-hamburger"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((o) => !o)}
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
      )}

      {/* Mobile menu panel */}
      <div className="navbar-mobile-panel" ref={menuRef} aria-hidden={!menuOpen}>
        <div className="navbar-mobile-content">

          <div className="navbar-logo mobile-logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
            {/* Make logo appear black with CSS filter */}
            <img src={logo} alt="Logo" style={{ filter: "brightness(0)" }} />
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
            <a href="https://github.com/yourgithub" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <img src={githubIcon} alt="GitHub" width={24} height={24} />
            </a>
            <a href="https://twitter.com/yourtwitter" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <img src={twitterIcon} alt="Twitter" width={24} height={24} />
            </a>
            <a href="https://linkedin.com/in/yourlinkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src={linkedinIcon} alt="LinkedIn" width={24} height={24} />
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
