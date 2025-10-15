import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';
import Beams from "./components/Beams.jsx"; 
import Navbar from "./components/Navbar.jsx";
import ImageTrailEffect from "./components/ImageTrailEffect.jsx";
import LandingAnimation from "./components/Landingpage.jsx";
import About from "./components/About.jsx";

// =================================================================
// 1. New Component: ScrollToTop
// Fixes the issue of scroll position not resetting on route change.
// =================================================================
const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Scrolls the browser window (document) to the top on every route change.
        window.scrollTo(0, 0); 
    }, [pathname]);

    return null;
};

export default function App() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const [showLanding, setShowLanding] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    // =================================================================
    // FIX 2: Ensure Body/HTML can scroll (If you have global CSS setting 
    //        body { overflow: hidden; }, you must remove it.)
    // =================================================================
    useEffect(() => {
        function handleResize() {
            setIsMobile(window.innerWidth <= 768);
        }

        handleResize();
        window.addEventListener("resize", handleResize);
        window.addEventListener("orientationchange", handleResize);
        
        const interval = setInterval(handleResize, 100);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("orientationchange", handleResize);
            clearInterval(interval);
        };
    }, []);

    // NOTE: If you previously added logic to hide the body scrollbar, remove it now.
    // Example to REMOVE:
    // useEffect(() => { document.body.style.overflow = "hidden"; return () => { document.body.style.overflow = "auto"; }; }, []);


    return (
        // =================================================================
        // FIX 3: Removed custom scroll constraints (height: 100vh, overflow: hidden)
        //        Now the outermost div just wraps content.
        // =================================================================
        <div style={{
            width: "100%",
            minHeight: "100vh", 
            // Removed overflow: "hidden" here to allow body scroll
        }}>
            {/* ScrollToTop component needs to be inside the router context */}
            <ScrollToTop /> 
            
            {/* Background beams - always fixed */}
            <div style={{
                position: "fixed",
                inset: 0,
                zIndex: 0,
                overflow: "hidden",
                pointerEvents: "none"
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

            {/* Navbar - fixed at top */}
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                pointerEvents: showLanding ? "none" : "auto",
                opacity: showLanding ? 0 : 1,
                transition: "opacity 0.72s cubic-bezier(.22,.99,.44,1)",
            }}>
                <Navbar />
            </div>

            {/* Main content container */}
            <main
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    minHeight: "100vh", 
                    
                    // FIX 4: Removed all scroll logic from the <main> element
                    // Removed maxHeight: "100vh",
                    // Removed overflowY: "auto",
                    
                    overflowX: "hidden",
                    pointerEvents: showLanding ? "none" : "auto",
                    opacity: showLanding ? 0 : 1,
                    transition: "opacity 0.72s cubic-bezier(.22,.99,.44,1)",
                    // Removed scrollBehavior: "smooth" (use global CSS instead for native smooth scroll)
                }}
            >
                <Routes>
                    {/* Home Page with scrollable layout */}
                    <Route path="/" element={
                        <div style={{ 
                            width: "100%",
                            overflowX: "hidden"
                        }}>
                            {/* ImageTrailEffect section - takes full viewport */}
                            <section id="home" style={{ // Added ID for navigation
                                height: "100vh",
                                width: "100%",
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}>
                                <ImageTrailEffect />
                            </section>
                            
                            {/* About section - appears when you scroll down */}
                            <section id="about" style={{ // Added ID for navigation
                                minHeight: "100vh",
                                width: "100%",
                                position: "relative",
                            }}>
                                <About />
                            </section>
                            
                            {/* Add other sections for content below About if needed */}
                        </div>
                    } />

                    {/* Separate About route */}
                    <Route path="/about" element={
                        <div style={{
                            // Changed minHeight to height to enforce full-page container
                            minHeight: "100vh", 
                            width: "100%",
                            paddingTop: "6rem",
                            overflowX: "hidden"
                        }}>
                            <About />
                        </div>
                    } /> 
                </Routes>
            </main>

            {/* Landing screen animation */}
            {showLanding && (
                <LandingAnimation
                    onFinish={() => setShowLanding(false)}
                    setLandingOpacity={() => {}}
                />
            )}
        </div>
    );
}