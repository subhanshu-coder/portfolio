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
    return () => window.removeEventListener('resize', checkMobile);
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
      height: '100vh',
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
          zIndex: 5,
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

      {/* Main Text & Buttons Content Container */}
      <div
        style={{
          position: 'absolute',
          top: '55%',
          left: '50%',
          transform: visible ? 'translate(-50%, -50%)' : 'translate(-50%, -45%)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 1s ease, transform 1s ease',
          maxWidth: 800,
          width: 'clamp(85%, 90%, 95%)',
          textAlign: 'center',
          color: '#fff',
          zIndex: 20, // Higher than trail to ensure clicks work
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '0 clamp(10px, 3vw, 20px)',
          boxSizing: 'border-box',
          pointerEvents: 'none', // Allows trail to work through the container
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
          <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: isMobile ? '2rem' : '5rem' }}>
            I am
          </span>
          <span style={{ fontFamily: "'Pacifico', cursive", color: '#00ffcc', fontWeight: 800, fontSize: isMobile ? '2rem' : '5rem' }}>
            Subhanshu Pal
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: isMobile ? '0.9rem' : '1.3em',
          lineHeight: 1.6,
          fontFamily: "'Poppins', sans-serif",
          margin: '10px 0 30px 0',
          maxWidth: 800,
        }}>
          Passionate about crafting beautiful and intuitive digital experiences.
          <br />
          Dedicated coder with a love for solving complex problems.
        </p>

        {/* Buttons Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '15px' : '26px',
            justifyContent: 'center',
            alignItems: 'center',
            pointerEvents: 'auto', // MUST BE AUTO TO CLICK
            width: isMobile ? '100%' : 'auto',
          }}
        >
          <button
          //   style={styles.primaryButton}
          //   onClick={() => window.open('/Resume_Subhanshu_Pal.pdf', '_blank')}
          // >
          style={styles.primaryButton}
  onClick={() => {
    // Vite needs the base path prefix to find the file in the public folder
    window.open('/3dportfolio/Resume_Subhanshu_Pal.pdf', '_blank');
  }}
>
            View Resume
          </button>

          <button
            style={styles.secondaryButton}
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get In Touch
          </button>
        </div>

        {/* Cursor Instruction Text */}
        <div style={{ marginTop: isMobile ? 35 : 60 }}>
          <p style={{
            fontSize: isMobile ? '0.8rem' : '1.2rem',
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: "monospace",
            letterSpacing: '3px',
            textTransform: 'uppercase',
          }}>
            Move the cursor, & Enjoy the Softness
          </p>
        </div>
      </div>
    </div>
  );
}

// Styles Definition to fix ReferenceError
const styles = {
  primaryButton: {
    padding: '14px 34px',
    fontSize: '1rem',
    fontWeight: 600,
    backgroundColor: '#00ffcc',
    border: 'none',
    borderRadius: '7px',
    cursor: 'pointer',
    color: '#222',
    boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
    transition: 'all 0.3s ease',
  },
  secondaryButton: {
    padding: '14px 34px',
    fontSize: '1rem',
    fontWeight: 600,
    color: '#00ffcc',
    backgroundColor: 'transparent',
    border: '2px solid #00ffcc',
    borderRadius: '7px',
    cursor: 'pointer',
    boxShadow: '0 1px 12px 0 rgba(0,0,0,0.10)',
    transition: 'all 0.3s ease',
  }
};