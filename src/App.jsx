import { useState } from "react";
import Beams from "./components/Beams";
import Navbar from "./components/Navbar";
import IntroText from "./components/IntroText";
import LandingAnimation from "./components/Landingpage";

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [landingOpacity, setLandingOpacity] = useState(1);

  return (
    <>
      {/* Background and homescreen always rendered, underneath */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden" }}>
        <Beams beamWidth={3} beamHeight={20} beamNumber={8} lightColor="#fff" speed={2} noiseIntensity={1.5} scale={0.2} rotation={30}/>
      </div>
      <div style={{ position: "fixed", inset: 0, zIndex: 10, pointerEvents: "none", opacity: showLanding ? 0 : 1, transition: "opacity 0.72s cubic-bezier(.22,.99,.44,1)" }}>
        <div style={{ pointerEvents: "auto", width: "100%", height: "100%" }}>
          <Navbar />
          <IntroText />
        </div>
      </div>
      {/* Landing is on top, but will fade out and slide up */}
      {showLanding && (
        <LandingAnimation
          onFinish={() => setShowLanding(false)}
          setLandingOpacity={setLandingOpacity}
        />
      )}
    </>
  );
}
