import { useEffect, useState, useRef } from 'react';

// Utility Functions
function lerp(a, b, n) {
  return (1 - n) * a + n * b;
}

function getLocalPointerPos(e, rect) {
  let clientX = 0, clientY = 0;
  if (e.touches && e.touches.length > 0) {
    clientX = e.touches[0].clientX;
    clientY = e.touches[0].clientY;
  } else {
    clientX = e.clientX;
    clientY = e.clientY;
  }
  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  };
}

function getMouseDistance(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  return Math.hypot(dx, dy);
}

// Classes for Image Trail Effect
class ImageItem {
  constructor(el) {
    this.el = el;
    this.rect = el.getBoundingClientRect();
    this.inner = el.querySelector('.content__img-inner');
    this.defaultStyle = { scale: 1, x: 0, y: 0, opacity: 0 };
  }
  updateRect() {
    this.rect = this.el.getBoundingClientRect();
  }
}

class ImageTrail {
  constructor(container) {
    this.container = container;
    this.images = [...container.querySelectorAll('.content__img')].map(
      (img) => new ImageItem(img)
    );
    this.imagesTotal = this.images.length;
    this.imgPosition = 0;
    this.zIndexVal = 1;
    this.mousePos = { x: 0, y: 0 };
    this.lastMousePos = { x: 0, y: 0 };
    this.cacheMousePos = { x: 0, y: 0 };
    this.isIdle = true;
    this.threshold = 18;

    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.initRender = this.initRender.bind(this);
    this.render = this.render.bind(this);

    container.addEventListener('mousemove', this.handlePointerMove);
    container.addEventListener('touchmove', this.handlePointerMove);
    container.addEventListener('mousemove', this.initRender);
    container.addEventListener('touchmove', this.initRender);
  }

  handlePointerMove(ev) {
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(ev, rect);
  }

  initRender(ev) {
    const rect = this.container.getBoundingClientRect();
    this.mousePos = getLocalPointerPos(ev, rect);
    this.cacheMousePos = { ...this.mousePos };
    requestAnimationFrame(() => this.render());
    this.container.removeEventListener('mousemove', this.initRender);
    this.container.removeEventListener('touchmove', this.initRender);
  }

  render() {
    let distance = getMouseDistance(this.mousePos, this.lastMousePos);
    
    this.cacheMousePos.x = lerp(this.cacheMousePos.x, this.mousePos.x, 0.5);
    this.cacheMousePos.y = lerp(this.cacheMousePos.y, this.mousePos.y, 0.5);

    if (distance > this.threshold) {
      this.showNextImage();
      this.lastMousePos = { ...this.mousePos };
    }
    if (this.isIdle && this.zIndexVal !== 1) this.zIndexVal = 1;
    requestAnimationFrame(() => this.render());
  }

  showNextImage() {
    this.zIndexVal = this.zIndexVal + 1;
    this.imgPosition = this.imgPosition < this.imagesTotal - 1 ? this.imgPosition + 1 : 0;
    const img = this.images[this.imgPosition];
    
    img.el.style.transition = 'none';
    img.el.style.opacity = '1';
    img.el.style.transform = `translate(${this.cacheMousePos.x - img.rect.width / 2}px, ${this.cacheMousePos.y - img.rect.height / 2}px) scale(0.3)`;
    img.el.style.zIndex = this.zIndexVal;
    
    void img.el.offsetHeight;
    
    this.isIdle = false;
    img.el.style.transition = 'transform 0.8s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.8s ease';
    img.el.style.transform = `translate(${this.mousePos.x - img.rect.width / 2}px, ${this.mousePos.y - img.rect.height / 2}px) scale(1)`;
    
    setTimeout(() => {
      img.el.style.transition = 'transform 1s cubic-bezier(0.23, 1, 0.32, 1), opacity 1s ease';
      img.el.style.opacity = '0';
      img.el.style.transform = `translate(${this.mousePos.x - img.rect.width / 2}px, ${this.mousePos.y - img.rect.height / 2}px) scale(0.3)`;
      
      setTimeout(() => {
        this.isIdle = true;
      }, 1000);
    }, 800);
  }

  destroy() {
    this.container.removeEventListener('mousemove', this.handlePointerMove);
    this.container.removeEventListener('touchmove', this.handlePointerMove);
  }
}

// Main Component
export default function ImageTrailEffect() {
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);
  const containerRef = useRef(null);
  const trailInstanceRef = useRef(null);

  const trailImages = [
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
    'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chakraui/chakraui-original.svg',
    'https://vitejs.dev/logo.svg'
  ];

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function checkMobile() {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
    }

    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);

    const interval = setInterval(checkMobile, 100);

    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current && trailImages.length > 0) {
      trailInstanceRef.current = new ImageTrail(containerRef.current);
    }

    return () => {
      if (trailInstanceRef.current) {
        trailInstanceRef.current.destroy();
      }
    };
  }, [trailImages.length]);

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    }}>
      {/* Image Trail Container */}
      <div
        ref={containerRef}
        className="content"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'auto',
          zIndex: 15,
        }}
      >
        {trailImages.map((src, index) => (
          <div
            key={index}
            className="content__img"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: 0,
              zIndex: 1,
              pointerEvents: 'none',
              willChange: 'transform, opacity',
            }}
          >
            <div
              className="content__img-inner"
              style={{
                width: isMobile ? 90 : 150,
                height: isMobile ? 90 : 150,
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                filter: 'drop-shadow(0 10px 25px rgba(0, 255, 204, 0.6)) brightness(1.3) contrast(1.1)',
                borderRadius: '12px',
              }}
            />
          </div>
        ))}
      </div>

      {/* Main Text Content Container */}
      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '50%',
          transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease, transform 1s ease',
          maxWidth: 800,
          width: 'clamp(85%, 90%, 95%)',
          textAlign: 'center',
          color: '#fff',
          userSelect: 'none',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 clamp(10px, 3vw, 20px)',
          boxSizing: 'border-box',
        }}
      >
        {/* Name Title */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            justifyContent: 'center',
            fontWeight: 900,
            marginBottom: isMobile ? 15 : 20,
            lineHeight: isMobile ? 1.2 : 1.1,
            gap: isMobile ? '6px' : '12px',
          }}
        >
          <span
            style={{
              fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
              color: '#fff',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : '5rem',
            }}
          >
            I am
          </span>
          <span
            style={{
              fontFamily: "'Pacifico', cursive",
              color: '#00ffcc',
              fontWeight: 800,
              fontSize: isMobile ? 'clamp(2rem, 8vw, 2.5rem)' : '5rem',
              letterSpacing: isMobile ? '.3px' : '.5px',
            }}
          >
            Subhanshu Pal
          </span>
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: isMobile ? 'clamp(0.875rem, 3.5vw, 1rem)' : '1.3em',
            fontWeight: isMobile ? 400 : 500,
            lineHeight: isMobile ? 1.6 : 1.4,
            fontFamily: "'Poppins', 'DM Sans', Arial, sans-serif",
            margin: isMobile ? '15px 0 30px 0' : '10px 0px 46px 0',
            maxWidth: isMobile ? '100%' : 800,
          }}
        >
          Passionate about crafting beautiful and intuitive digital experiences.
          <br />
          Dedicated coder with a love for solving complex problems.
          <br />
          Always eager to learn and innovate in the world of technology.
        </p>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '15px' : '26px',
            justifyContent: 'center',
            alignItems: isMobile ? 'center' : 'flex-start',
            pointerEvents: 'auto',
            width: isMobile ? '100%' : 'auto',
          }}
        >
          {/* Contact Me Button */}
          <button
            style={{
              padding: isMobile ? '14px 0' : '14px 34px',
              fontSize: '1rem',
              fontWeight: 600,
              backgroundColor: '#00ffcc',
              border: 'none',
              borderRadius: 7,
              cursor: 'pointer',
              color: '#222',
              boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
              transition: 'all 0.3s ease',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '320px' : 'none',
            }}
            onClick={() => {
              const aboutSection = document.querySelector('section[data-about]');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#00e6b8';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 20px 0 rgba(0, 255, 204, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00ffcc';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 12px 0 rgba(0,0,0,0.10)';
            }}
          >
            About Me
          </button>

          {/* Portfolio Button */}
          <button
            style={{
              padding: isMobile ? '14px 0' : '14px 34px',
              fontSize: '1rem',
              fontWeight: 600,
              color: '#00ffcc',
              backgroundColor: 'transparent',
              border: '2px solid #00ffcc',
              borderRadius: 7,
              cursor: 'pointer',
              boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
              transition: 'all 0.3s ease',
              width: isMobile ? '100%' : 'auto',
              maxWidth: isMobile ? '320px' : 'none',
            }}
            onClick={() => alert('Portfolio coming soon!')}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'rgba(0, 255, 204, 0.1)';
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 20px 0 rgba(0, 255, 204, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 1px 12px 0 rgba(0,0,0,0.10)';
            }}
          >
            Portfolio
          </button>
        </div>

        {/* Cursor Instruction Text */}
        <div
          style={{
            marginTop: isMobile ? 35 : 60,
            userSelect: 'none',
            pointerEvents: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <style>
            {`
              @keyframes neon-pulse {
                0%, 100% { text-shadow: 0 0 10px rgba(0, 255, 204, 0.6), 0 0 20px rgba(0, 255, 204, 0.3); }
                50% { text-shadow: 0 0 15px rgba(0, 255, 204, 0.9), 0 0 30px rgba(0, 255, 204, 0.5); }
              }
            `}
          </style>

          <p
            style={{
              fontSize: isMobile ? '1rem' : '1.5rem',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontFamily: "'Courier New', monospace",
              letterSpacing: '3px',
              textTransform: 'uppercase',
            }}
          >
            Move the cursor, & Enjoy the Softness
          </p>
        </div>
      </div>
    </div>
  );
}