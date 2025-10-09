import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import Landingpageshapes from "./Landingbg"; // Your animated shapes background

export default function LandingAnimation({ onFinish, setLandingOpacity }) {
  const words = ["code.", "design.", "dream."];
  const [percent, setPercent] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [visible, setVisible] = useState(true);
  const ref = useRef();

  useEffect(() => {
    if (percent < 100) {
      setTimeout(() => setPercent(percent + 1), 23);
      // Word transition every 33%
      if (
        percent > 0 &&
        percent < 100 &&
        percent % Math.floor(100 / words.length) === 0
      ) {
        setVisible(false);
        setTimeout(() => {
          setCurrentWord((i) => (i + 1) % words.length);
          setVisible(true);
        }, 350);
      }
      // Reveal homescreen as loading nears end
      if (percent > 85 && setLandingOpacity) setLandingOpacity((100 - percent) / 15);
    } else {
      gsap.to(ref.current, {
        y: -window.innerHeight,
        opacity: 0,
        duration: 0.9,
        ease: "power2.inOut",
        onComplete: onFinish,
      });
      if (setLandingOpacity) setLandingOpacity(0);
    }
  }, [percent, currentWord, onFinish, setLandingOpacity, words.length]);

  return (
    <div ref={ref} style={containerStyle}>
      <Landingpageshapes />
      <div
        style={{
          ...wordStyle,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.41s cubic-bezier(.52,.89,.32,1)",
          position: "relative",
          zIndex: 10,
        }}
      >
        {words[currentWord]}
      </div>
      <div style={fullBarBottomStyle}>
        <div style={percentStyle}>Loading {percent}%</div>
        <div style={barOuter}>
          <div style={{ ...barInner, width: `${percent}%` }} />
        </div>
      </div>
    </div>
  );
}

const containerStyle = {
  position: "fixed",
  inset: 0,
  background: "#111",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 99999,
  overflow: "hidden",
  userSelect: "none",
};

const wordStyle = {
  fontSize: "2.7rem",
  color: "#00ffcc",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  marginBottom: "85px",
  userSelect: "none",
};

const fullBarBottomStyle = {
  position: "fixed",
  left: 0,
  bottom: 0,
  width: "100vw",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  zIndex: 10,
};

const percentStyle = {
  color: "#00ffcc",
  fontSize: "1.05rem",
  fontWeight: 600,
  marginBottom: "9px",
  userSelect: "none",
};

const barOuter = {
  width: "100vw",
  height: 14,
  borderRadius: 0,
  background: "#222",
  overflow: "hidden",
};

const barInner = {
  height: "100%",
  borderRadius: 0,
  background: "linear-gradient(90deg, #00ffc7 35%, #0ecfbb 100%)",
  transition: "width 0.23s cubic-bezier(.6,.4,.6,1)",
};
