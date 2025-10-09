import { useEffect, useState } from 'react';

export default function IntroText() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        ...container,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, -40%)',
        transition: 'opacity 1s ease, transform 1s ease',
      }}
    >
      <div style={titleBoxStyle}>
        <span style={mainTitleStyle}>I am&nbsp;</span>
        <span style={cursiveNameStyle}>Subhanshu Pal</span>
      </div>
      <p style={subtitleStyle}>
        Passionate about crafting beautiful and intuitive digital experiences.<br />
        Dedicated coder with a love for solving complex problems.<br />
        Always eager to learn and innovate in the world of technology.
      </p>
      <div style={buttonRowStyle}>
        <button
          style={buttonStyle}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          Contact Me
        </button>
        <button
          style={buttonStyleAlt}
          onClick={() => alert('Portfolio coming soon!')}
        >
          Portfolio
        </button>
      </div>
    </div>
  );
}

const container = {
  position: 'fixed',
  top: '60%',
  left: '50%',
  maxWidth: 800,
  width: '85vw',
  textAlign: 'center',
  color: '#fff',
  userSelect: 'none',
  pointerEvents: 'none',
  zIndex: 20,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const titleBoxStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'baseline',
  justifyContent: 'center',
  fontWeight: 900,
  fontSize: '4rem',
  marginBottom: 20,
  lineHeight: 1.05,
  gap: '8px',
};

const mainTitleStyle = {
  fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
  color: '#fff',
  fontWeight: 800,
  fontSize: '5rem',
};

const cursiveNameStyle = {
  fontFamily: "'Pacifico', cursive",
  color: '#00ffcc',
  fontWeight: 800,
  fontSize: '5rem',
  marginLeft: '4px',
  letterSpacing: '.5px',
};

const subtitleStyle = {
  fontSize: '1.40rem',
  fontWeight: 400,
  lineHeight: 1.5,
  fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
  margin: '10px 0 36px 0',
  maxWidth: 800,
};

const buttonRowStyle = {
  display: 'flex',
  gap: '26px',
  justifyContent: 'center',
  pointerEvents: 'auto',
};

const buttonStyle = {
  padding: '14px 34px',
  fontSize: '1rem',
  fontWeight: 600,
  backgroundColor: '#00ffcc',
  border: 'none',
  borderRadius: 7,
  cursor: 'pointer',
  color: '#222',
  boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
  transition: 'background-color 0.3s',
};

const buttonStyleAlt = {
  ...buttonStyle,
  color: '#00ffcc',
  backgroundColor: 'transparent',
  border: '2px solid #00ffcc',
};
