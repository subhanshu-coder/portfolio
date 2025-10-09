import { useState, useEffect } from "react";
import Beams from "./components/Beams";
import Navbar from "./components/Navbar";
import IntroText from "./components/IntroText";
import LandingAnimation from "./components/Landingpage";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [landingOpacity, setLandingOpacity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    // Initial check
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    
    // Polling for DevTools device toggle
    const interval = setInterval(handleResize, 100);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      {/* Background beams */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden"
      }}>
        <Beams
          beamWidth={isMobile ? 2 : 3}
          beamHeight={isMobile ? 12 : 20}
          beamNumber={isMobile ? 5 : 8}
          lightColor="#fff"
          speed={2}
          noiseIntensity={1.5}
          scale={isMobile ? 0.1 : 0.2}
          rotation={30}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 10,
          pointerEvents: "none",
          opacity: showLanding ? 0 : 1,
          transition: "opacity 0.72s cubic-bezier(.22,.99,.44,1)",
        }}
      >
        <div
          style={{
            pointerEvents: "auto",
            width: "100%",
            height: "100%",
            margin: "0 auto",
            boxSizing: "border-box",
          }}
        >
          <Navbar />
          <IntroText />
        </div>
      </div>

      {/* Landing screen animation */}
      {showLanding && (
        <LandingAnimation
          onFinish={() => setShowLanding(false)}
          setLandingOpacity={setLandingOpacity}
        />
      )}
    </>
  );
}