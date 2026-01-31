document.addEventListener('DOMContentLoaded', function() {
  // Check if device is mobile
  const isMobile = window.innerWidth <= 768;
  
  if (isMobile) {
    // For mobile, create simple static dots
    createMobileDots();
    return;
  }
  
  // Create canvas for desktop
  const canvas = document.createElement('canvas');
  canvas.className = 'ambient-canvas';
  const ctx = canvas.getContext('2d');
  
  const container = document.createElement('div');
  container.className = 'ambient-network';
  container.appendChild(canvas);
  document.body.appendChild(container);
  
  // Configuration
  const config = {
    dotCount: 50,
    dotSize: 2,
    maxDistance: 150,
    mouseRadius: 100,
    speed: 0.3,
    color: getComputedStyle(document.documentElement).getPropertyValue('--accent'),
    lineColor: getComputedStyle(document.documentElement).getPropertyValue('--accent'),
    dotOpacity: 0.5,
    lineOpacity: 0.1
  };
  
  // Resize canvas
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Mouse position
  const mouse = {
    x: null,
    y: null
  };
  
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });
  
  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });
  
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
      
      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
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
      
      // Breathing effect
      this.pulsePhase += 0.02;
      this.radius = this.baseRadius + Math.sin(this.pulsePhase) * 0.5;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = config.color + Math.floor(config.dotOpacity * 255).toString(16).padStart(2, '0');
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
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x;
        const dy = dots[i].y - dots[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.maxDistance) {
          const opacity = (1 - distance / config.maxDistance) * config.lineOpacity;
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = config.lineColor + Math.floor(opacity * 255).toString(16).padStart(2, '0');
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
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
        config.color = getComputedStyle(document.documentElement).getPropertyValue('--accent');
        config.lineColor = getComputedStyle(document.documentElement).getPropertyValue('--accent');
      }, 100);
    });
  }
  
  // Start animation
  animate();
});

// Mobile fallback function
function createMobileDots() {
  const container = document.createElement('div');
  container.className = 'ambient-dots-container';
  document.body.appendChild(container);
  
  function createDot() {
    const dot = document.createElement('div');
    dot.className = 'ambient-dot';
    
    const size = Math.random() * 6 + 3;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    dot.style.left = `${posX}%`;
    dot.style.top = `${posY}%`;
    
    const delay = Math.random() * 8;
    dot.style.animationDelay = `${delay}s`;
    
    return dot;
  }
  
  const dotCount = window.innerWidth < 480 ? 10 : 15;
  for (let i = 0; i < dotCount; i++) {
    container.appendChild(createDot());
  }
}
