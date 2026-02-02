document.addEventListener('DOMContentLoaded', function() {
  // Create container
  const networkContainer = document.createElement('div');
  networkContainer.className = 'ambient-network';
  
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient-canvas';
  const ctx = canvas.getContext('2d');
  
  networkContainer.appendChild(canvas);
  document.body.appendChild(networkContainer);
  
  // Check if mobile
  function isMobileDevice() {
    return (
      window.innerWidth <= 768 || 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      ('ontouchstart' in window) ||
      (navigator.maxTouchPoints > 0)
    );
  }
  
  const isMobile = isMobileDevice();
  
  // Get current theme
  function getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }
  
  // Get colors based on theme
  function getThemeColors() {
    const theme = getCurrentTheme();
    if (theme === 'light') {
      return {
        dot: '#1e66d0',      // Bright blue for light theme
        line: '#1e66d0',     // Bright blue for light theme
        dotOpacity: 0.8,     // Increased from 0.4/0.5
        lineOpacity: 0.3     // Increased from 0.08/0.1
      };
    } else {
      return {
        dot: '#6ab0ff',      // Brighter blue for dark theme
        line: '#6ab0ff',     // Brighter blue for dark theme
        dotOpacity: 0.9,     // Increased from 0.4/0.5
        lineOpacity: 0.4     // Increased from 0.08/0.1
      };
    }
  }
  
  // Configuration - different for mobile and desktop
  const config = {
    dotCount: isMobile ? 20 : 50,
    dotSize: isMobile ? 2 : 2.5,        // Increased size
    maxDistance: isMobile ? 100 : 150,
    mouseRadius: isMobile ? 50 : 100,
    speed: isMobile ? 0.2 : 0.3,
    frameSkip: isMobile ? 2 : 1,
    ...getThemeColors() // Spread theme colors
  };
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse/Touch position
  const pointer = {
    x: null,
    y: null
  };
  
  // Mouse events for desktop
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    });
    
    window.addEventListener('mouseout', () => {
      pointer.x = null;
      pointer.y = null;
    });
  } else {
    // Touch events for mobile
    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        pointer.x = e.touches[0].clientX;
        pointer.y = e.touches[0].clientY;
      }
    });
    
    window.addEventListener('touchend', () => {
      pointer.x = null;
      pointer.y = null;
    });
  }
  
  // Dot class
  class Dot {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * config.speed;
      this.vy = (Math.random() - 0.5) * config.speed;
      this.radius = config.dotSize;
      this.baseRadius = config.dotSize;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.brightness = 0.8 + Math.random() * 0.2; // Random brightness variation
    }
    
    update() {
      // Move dot
      this.x += this.vx;
      this.y += this.vy;
      
      // Bounce off walls
      if (this.x < 0 || this.x > canvas.width) {
        this.vx = -this.vx;
      }
      if (this.y < 0 || this.y > canvas.height) {
        this.vy = -this.vy;
      }
      
      // Keep dots within bounds
      this.x = Math.max(0, Math.min(canvas.width, this.x));
      this.y = Math.max(0, Math.min(canvas.height, this.y));
      
      // Mouse/Touch interaction
      if (pointer.x !== null && pointer.y !== null) {
        const dx = pointer.x - this.x;
        const dy = pointer.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.mouseRadius) {
          const force = (config.mouseRadius - distance) / config.mouseRadius;
          const angle = Math.atan2(dy, dx);
          this.vx -= Math.cos(angle) * force * 0.02;
          this.vy -= Math.sin(angle) * force * 0.02;
        }
      }
      
      // Limit velocity
      const maxSpeed = config.speed * 2;
      const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      if (currentSpeed > maxSpeed) {
        this.vx = (this.vx / currentSpeed) * maxSpeed;
        this.vy = (this.vy / currentSpeed) * maxSpeed;
      }
      
      // Breathing effect - reduced on mobile
      const pulseSpeed = isMobile ? 0.01 : 0.02;
      this.pulsePhase += pulseSpeed;
      this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.8; // Increased pulse effect
    }
    
    draw() {
      // Create gradient for brighter effect
      const gradient = ctx.createRadialGradient(
        this.x, this.y, 0,
        this.x, this.y, this.radius * 2
      );
      
      const opacity = config.dotOpacity * this.brightness;
      gradient.addColorStop(0, config.dot + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(0.5, config.dot + Math.floor(opacity * 0.5 * 255).toString(16).padStart(2, '0'));
      gradient.addColorStop(1, config.dot + '00');
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw solid center
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.dot + Math.floor(opacity * 255).toString(16).padStart(2, '0');
      ctx.fill();
    }
  }
  
  // Create dots
  const dots = [];
  for (let i = 0; i < config.dotCount; i++) {
    dots.push(new Dot());
  }
  
  // Draw connections
  function drawConnections() {
    // Optimize connection drawing on mobile
    const maxDistanceSq = config.maxDistance * config.maxDistance;
    
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distanceSq = dx * dx + dy * dy;
        
        if (distanceSq < maxDistanceSq) {
          const distance = Math.sqrt(distanceSq);
          const opacity = (1 - distance / config.maxDistance) * config.lineOpacity;
          
          // Create gradient for lines
          const gradient = ctx.createLinearGradient(
            dots[i].x, dots[i].y,
            dots[j].x, dots[j].y
          );
          gradient.addColorStop(0, config.line + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(0.5, config.line + Math.floor(opacity * 0.8 * 255).toString(16).padStart(2, '0'));
          gradient.addColorStop(1, config.line + Math.floor(opacity * 255).toString(16).padStart(2, '0'));
          
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = isMobile ? 0.8 : 1; // Thicker lines
          ctx.stroke();
        }
      }
    }
  }
  
  // Frame counter for mobile optimization
  let frameCount = 0;
  
  // Animation loop
  function animate() {
    // Skip frames on mobile for better performance
    frameCount++;
    if (isMobile && frameCount % config.frameSkip !== 0) {
      requestAnimationFrame(animate);
      return;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw dots
    dots.forEach(dot => {
      dot.update();
      dot.draw();
    });
    
    // Draw connections
    drawConnections();
    
    requestAnimationFrame(animate);
  }
  
  // Update colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        const newColors = getThemeColors();
        config.dot = newColors.dot;
        config.line = newColors.line;
        config.dotOpacity = newColors.dotOpacity;
        config.lineOpacity = newColors.lineOpacity;
      }, 100);
    });
  }
  
  // Handle visibility change to pause animation when tab is not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      // Pause animation when tab is not visible
      config.speed = 0;
    } else {
      // Resume animation
      config.speed = isMobile ? 0.2 : 0.3;
    }
  });
  
  // Start animation
  animate();
  
  // Adjust configuration on window resize
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = isMobileDevice();
      if (newIsMobile !== isMobile) {
        // Reload page to apply new configuration
        location.reload();
      }
    }, 250);
  });
});
