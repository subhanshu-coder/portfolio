import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from 'react-router-dom';


// Component Imports
import Beams from "./components/Beams.jsx";
import Navbar from "./components/Navbar.jsx";
import ImageTrailEffect from "./components/ImageTrailEffect.jsx";
import LandingAnimation from "./components/Landingpage.jsx";
import About from "./components/About.jsx";
import Work from "./components/Works.jsx"; 
import Skills from "./components/Skills.jsx";
import Education from "./components/Education";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
// import FAQ from "./components/FAQ.jsx";
// import ScrollToTop from "./components/ScrollToTop";


// ScrollToTop Component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0); 
    }, [pathname]);
    return null;
};


export default function App() {
    const location = useLocation();
    const [showLanding, setShowLanding] = useState(true);
    const [isMobile, setIsMobile] = useState(false);


    // check if we are on home page to show/hide navbar
    const isHomePage = location.pathname === '/';


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


    return (
        <div style={{ width: "100%", minHeight: "100vh" }}>
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


            {/* Navbar - Only on Home Page */}
            {isHomePage && (
                <div style={{
                    position: "absolute",
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
            )}


            {/* Main Content */}
            <main
                style={{
                    position: "relative",
                    zIndex: 10,
                    width: "100%",
                    minHeight: "100vh", 
                    overflowX: "hidden",
                    pointerEvents: showLanding ? "none" : "auto",
                    opacity: showLanding ? 0 : 1,
                    transition: "opacity 0.72s cubic-bezier(.22,.99,.44,1)",
                    paddingTop: isHomePage ? "0" : "0", 
                }}
            >
                <Routes>
                    
                    {/* 1. HOME ROUTE - One long scrollable page */}
                    <Route path="/" element={
                        <div style={{ width: "100%", overflowX: "hidden" }}>
                            {/* Hero Section */}
                            <section id="home" style={{ 
                                height: "100vh", width: "100%", position: "relative",
                                display: "flex", alignItems: "center", justifyContent: "center" 
                            }}>
                                <ImageTrailEffect />
                            </section>


                            {/* About Section */}
                            <section id="about" style={{ minHeight: "100vh", width: "100%" }}>
                                <About />
                            </section>
                            
                            {/* Work Section */}
                            <section id="work" style={{ minHeight: "100vh", width: "100%" }}>
                                <Work />
                            </section>


                          


                            {/* Skill Section - NOW PLACED HERE (After Process) */}
                            <section id="skill" style={{ minHeight: "100vh", width: "100%" }}>
                                <Skills />
                            </section>


                            {/* Education Section (The Sticky Scroll Design) */}
                               <div id="education">
                                 <Education />
                                 
                            {/* Contact Section */}
                            <section id="contact" style={{ minHeight: "100vh", width: "100%" }}>
                                <Contact />
                            </section>


                               </div>
                            {/* Footer Section */}
                            <section id="Footer" style={{ width: "100%" }}>
                                <Footer />
                            </section>
                        </div>
                    } />


                    {/* 2. STANDALONE PAGES */}
                    <Route path="/about" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <About />
                        </div>
                    } />


                    <Route path="/work" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <Work />
                        </div>
                    } />
{/* 
                    <Route path="/process" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                             <Process />
                        </div>
                    } /> */}


                    <Route path="/skill" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <Skills />
                        </div>
                    } />


                    <Route path="/education" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <Education />
                        </div>
                    } />
                    <Route path="/contact" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <Contact />
                        </div>
                    } />


                    <Route path="/footer" element={
                        <div style={{ minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
                            <Footer />
                        </div>
                    } />


                </Routes>
            </main>


            {/* Landing Animation */}
            {showLanding && (
                <LandingAnimation
                    onFinish={() => setShowLanding(false)}
                    setLandingOpacity={() => {}}
                />
            )}
        </div>
    );
}