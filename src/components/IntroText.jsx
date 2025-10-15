// import { useEffect, useState } from 'react';
// import ImageTrailEffect from './ImageTrailEffect';

// export default function IntroText() {
//   const [visible, setVisible] = useState(false);
//   const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

//   // Images for the trail effect
//   const trailImages = [
//     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
//     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
//     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
//     'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
//     'https://vitejs.dev/logo.svg'
//   ];

//   useEffect(() => {
//     const timer = setTimeout(() => setVisible(true), 600);
//     return () => clearTimeout(timer);
//   }, []);

//   useEffect(() => {
//     function checkMobile() {
//       const width = window.innerWidth;
//       setIsMobile(width <= 768);
//     }

//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     window.addEventListener('orientationchange', checkMobile);

//     const interval = setInterval(checkMobile, 100);

//     return () => {
//       window.removeEventListener('resize', checkMobile);
//       window.removeEventListener('orientationchange', checkMobile);
//       clearInterval(interval);
//     };
//   }, []);

//   return (
//     <div style={pageContainer}>
//       {/* Image Trail Effect Background */}
//       <ImageTrailEffect images={trailImages} />

//       {/* Main Content */}
//       <div
//         style={{
//           ...contentWrapper,
//           opacity: visible ? 1 : 0,
//           transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)',
//           transition: 'opacity 1s ease, transform 1s ease',
//         }}
//       >
//         <div style={isMobile ? titleBoxStyleMobile : titleBoxStyle}>
//           <span style={isMobile ? mainTitleStyleMobile : mainTitleStyle}>
//             I am
//           </span>
//           <span style={isMobile ? cursiveNameStyleMobile : cursiveNameStyle}>
//             Subhanshu Pal
//           </span>
//         </div>

//         <p style={isMobile ? subtitleStyleMobile : subtitleStyle}>
//           Passionate about crafting beautiful and intuitive digital experiences.
//           <br />
//           Dedicated coder with a love for solving complex problems.
//           <br />
//           Always eager to learn and innovate in the world of technology.
//         </p>

//         <div style={isMobile ? buttonRowStyleMobile : buttonRowStyle}>
//           <button
//             style={isMobile ? buttonStyleMobile : buttonStyle}
//             onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = '#00e6b8';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 4px 20px 0 rgba(0, 255, 204, 0.4)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = '#00ffcc';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 1px 12px 0 rgba(0,0,0,0.10)';
//             }}
//           >
//             Contact Me
//           </button>
//           <button
//             style={isMobile ? buttonStyleAltMobile : buttonStyleAlt}
//             onClick={() => alert('Portfolio coming soon!')}
//             onMouseEnter={(e) => {
//               e.target.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 4px 20px 0 rgba(0, 255, 204, 0.3)';
//             }}
//             onMouseLeave={(e) => {
//               e.target.style.backgroundColor = 'transparent';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 1px 12px 0 rgba(0,0,0,0.10)';
//             }}
//           >
//             Portfolio
//           </button>
//         </div>

//         <p style={isMobile ? softnessMessageMobile : softnessMessage}>
//           Move the cursor, feel the softness
//         </p>
//       </div>
//     </div>
//   );
// }

// // Styles
// const pageContainer = {
//   position: 'fixed',
//   top: 0,
//   left: 0,
//   width: '100vw',
//   height: '100vh',
//   overflow: 'hidden',
//   background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
// };

// const contentWrapper = {
//   position: 'fixed',
//   top: '50%',
//   left: '50%',
//   maxWidth: 800,
//   width: 'clamp(85%, 90%, 95%)',
//   textAlign: 'center',
//   color: '#fff',
//   userSelect: 'none',
//   pointerEvents: 'none',
//   zIndex: 20,
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'center',
//   padding: '0 clamp(10px, 3vw, 20px)',
//   boxSizing: 'border-box',
// };

// // Desktop Styles
// const titleBoxStyle = {
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'baseline',
//   justifyContent: 'center',
//   fontWeight: 900,
//   marginBottom: 20,
//   lineHeight: 1.1,
//   gap: '12px',
// };

// const mainTitleStyle = {
//   fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
//   color: '#fff',
//   fontWeight: 800,
//   fontSize: '5rem',
// };

// const cursiveNameStyle = {
//   fontFamily: "'Pacifico', cursive",
//   color: '#00ffcc',
//   fontWeight: 800,
//   fontSize: '5rem',
//   letterSpacing: '.5px',
// };

// const subtitleStyle = {
//   fontSize: '1.3em',
//   fontWeight: 500,
//   lineHeight: 1.4,
//   fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
//   margin: '10px 0px 46px 0',
//   maxWidth: 800,
// };

// const buttonRowStyle = {
//   display: 'flex',
//   gap: '26px',
//   justifyContent: 'center',
//   pointerEvents: 'auto',
//   flexWrap: 'wrap',
// };

// const buttonStyle = {
//   padding: '14px 34px',
//   fontSize: '1rem',
//   fontWeight: 600,
//   backgroundColor: '#00ffcc',
//   border: 'none',
//   borderRadius: 7,
//   cursor: 'pointer',
//   color: '#222',
//   boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
//   transition: 'all 0.3s ease',
// };

// const buttonStyleAlt = {
//   ...buttonStyle,
//   color: '#00ffcc',
//   backgroundColor: 'transparent',
//   border: '2px solid #00ffcc',
// };

// const softnessMessage = {
//   fontSize: '1rem',
//   fontWeight: 400,
//   color: '#00ffcc',
//   marginTop: 20,
//   opacity: 0.8,
//   userSelect: 'none',
//   pointerEvents: 'none',
// };

// // Mobile Styles
// const titleBoxStyleMobile = {
//   display: 'flex',
//   flexWrap: 'wrap',
//   alignItems: 'baseline',
//   justifyContent: 'center',
//   fontWeight: 900,
//   marginBottom: 15,
//   lineHeight: 1.2,
//   gap: '6px',
// };

// const mainTitleStyleMobile = {
//   fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
//   color: '#fff',
//   fontWeight: 800,
//   fontSize: 'clamp(2rem, 8vw, 2.5rem)',
// };

// const cursiveNameStyleMobile = {
//   fontFamily: "'Pacifico', cursive",
//   color: '#00ffcc',
//   fontWeight: 800,
//   fontSize: 'clamp(2rem, 8vw, 2.5rem)',
//   letterSpacing: '.3px',
// };

// const subtitleStyleMobile = {
//   fontSize: 'clamp(0.875rem, 3.5vw, 1rem)',
//   fontWeight: 400,
//   lineHeight: 1.6,
//   fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
//   margin: '15px 0 30px 0',
//   maxWidth: '100%',
// };

// const buttonRowStyleMobile = {
//   display: 'flex',
//   flexDirection: 'column',
//   gap: '15px',
//   justifyContent: 'center',
//   alignItems: 'center',
//   pointerEvents: 'auto',
//   width: '100%',
// };

// const buttonStyleMobile = {
//   padding: '14px 0',
//   fontSize: '1rem',
//   fontWeight: 600,
//   backgroundColor: '#00ffcc',
//   border: 'none',
//   borderRadius: 7,
//   cursor: 'pointer',
//   color: '#222',
//   boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
//   transition: 'all 0.3s ease',
//   width: '100%',
//   maxWidth: '320px',
// };

// const buttonStyleAltMobile = {
//   ...buttonStyleMobile,
//   color: '#00ffcc',
//   backgroundColor: 'transparent',
//   border: '2px solid #00ffcc',
// };

// const softnessMessageMobile = {
//   fontSize: '0.9rem',
//   fontWeight: 400,
//   color: '#00ffcc',
//   marginTop: 15,
//   opacity: 0.8,
//   userSelect: 'none',
//   pointerEvents: 'none',
// };
