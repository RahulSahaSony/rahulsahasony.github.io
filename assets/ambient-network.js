document.addEventListener('DOMContentLoaded', function() {
  // Create SVG container for organic roots
  const svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgContainer.setAttribute('class', 'organic-roots');
  svgContainer.style.position = 'fixed';
  svgContainer.style.top = '0';
  svgContainer.style.left = '0';
  svgContainer.style.width = '100%';
  svgContainer.style.height = '100%';
  svgContainer.style.zIndex = '-1';
  svgContainer.style.pointerEvents = 'none';
  svgContainer.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  document.body.appendChild(svgContainer);
  
  // Create a filter for glow effect
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
  filter.setAttribute('id', 'root-glow');
  
  const feGaussianBlur = document.createElementNS('http://www.w3.org/2000/svg', 'feGaussianBlur');
  feGaussianBlur.setAttribute('stdDeviation', '2');
  feGaussianBlur.setAttribute('result', 'coloredBlur');
  
  const feMerge = document.createElementNS('http://www.w3.org/2000/svg', 'feMerge');
  const feMergeNode1 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  feMergeNode1.setAttribute('in', 'coloredBlur');
  const feMergeNode2 = document.createElementNS('http://www.w3.org/2000/svg', 'feMergeNode');
  feMergeNode2.setAttribute('in', 'SourceGraphic');
  
  feMerge.appendChild(feMergeNode1);
  feMerge.appendChild(feMergeNode2);
  filter.appendChild(feGaussianBlur);
  filter.appendChild(feMerge);
  defs.appendChild(filter);
  svgContainer.appendChild(defs);
  
  // Theme colors
  function getRootColor() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    return theme === 'light' ? '#1e66d0' : '#4a9eff';
  }
  
  // Create a curved path
  function createPath(startX, startY, length, initialAngle, thickness, delay = 0) {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    const color = getRootColor();
    
    // Generate control points for a natural curve
    const segments = 5 + Math.floor(Math.random() * 5);
    let pathData = `M ${startX} ${startY}`;
    
    let currentX = startX;
    let currentY = startY;
    let currentAngle = initialAngle;
    
    for (let i = 0; i < segments; i++) {
      const segmentLength = length / segments;
      const angleVariation = (Math.random() - 0.5) * 60; // -30 to 30 degrees
      currentAngle += angleVariation;
      
      const nextX = currentX + Math.cos(currentAngle * Math.PI / 180) * segmentLength;
      const nextY = currentY + Math.sin(currentAngle * Math.PI / 180) * segmentLength;
      
      // Create control points for bezier curve
      const cp1X = currentX + Math.cos((currentAngle + 45) * Math.PI / 180) * segmentLength * 0.3;
      const cp1Y = currentY + Math.sin((currentAngle + 45) * Math.PI / 180) * segmentLength * 0.3;
      const cp2X = nextX - Math.cos((currentAngle - 45) * Math.PI / 180) * segmentLength * 0.3;
      const cp2Y = nextY - Math.sin((currentAngle - 45) * Math.PI / 180) * segmentLength * 0.3;
      
      pathData += ` C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${nextX} ${nextY}`;
      
      currentX = nextX;
      currentY = nextY;
      
      // Chance to branch
      if (i > 1 && Math.random() > 0.6 && thickness > 1) {
        setTimeout(() => {
          createBranch(currentX, currentY, currentAngle, length * 0.6, thickness * 0.7, delay + i * 0.5);
        }, delay * 1000 + i * 800);
      }
    }
    
    path.setAttribute('d', pathData);
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', thickness);
    path.setAttribute('fill', 'none');
    path.setAttribute('stroke-linecap', 'round');
    path.setAttribute('filter', 'url(#root-glow)');
    path.setAttribute('opacity', '0');
    
    // Calculate path length for animation
    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;
    
    // Add to SVG
    svgContainer.appendChild(path);
    
    // Animate the path
    setTimeout(() => {
      path.style.transition = 'stroke-dashoffset 8s ease-in-out, opacity 8s ease-in-out';
      path.style.strokeDashoffset = '0';
      path.style.opacity = '0.6';
      
      // Fade out at the end
      setTimeout(() => {
        path.style.transition = 'opacity 4s ease-out';
        path.style.opacity = '0';
      }, 8000);
    }, delay * 1000);
    
    // Clean up after animation
    setTimeout(() => {
      if (svgContainer.contains(path)) {
        svgContainer.removeChild(path);
      }
    }, (delay + 15) * 1000);
  }
  
  // Create a branch from an existing path
  function createBranch(startX, startY, parentAngle, length, thickness, delay = 0) {
    const angleVariation = (Math.random() - 0.5) * 90; // -45 to 45 degrees
    const newAngle = parentAngle + angleVariation;
    
    createPath(startX, startY, length, newAngle, thickness, delay);
  }
  
  // Create initial roots from different positions
  function createInitialRoots() {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Bottom left corner
    createPath(viewportWidth * 0.1, viewportHeight * 0.9, 300, 160, 3, 0);
    
    // Bottom right corner
    createPath(viewportWidth * 0.9, viewportHeight * 0.9, 280, -160, 2.5, 1);
    
    // Middle left
    createPath(viewportWidth * 0.05, viewportHeight * 0.6, 250, 120, 2.8, 2);
    
    // Middle right
    createPath(viewportWidth * 0.95, viewportHeight * 0.4, 270, -120, 2.2, 3);
    
    // Top middle
    createPath(viewportWidth * 0.5, viewportHeight * 0.05, 300, 90, 2.5, 4);
  }
  
  // Start the animation
  createInitialRoots();
  
  // Periodically add new roots
  setInterval(() => {
    const edge = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    let startX, startY, initialAngle;
    
    switch(edge) {
      case 0: // Top
        startX = Math.random() * window.innerWidth;
        startY = 0;
        initialAngle = 90 + (Math.random() - 0.5) * 60;
        break;
      case 1: // Right
        startX = window.innerWidth;
        startY = Math.random() * window.innerHeight;
        initialAngle = 180 + (Math.random() - 0.5) * 60;
        break;
      case 2: // Bottom
        startX = Math.random() * window.innerWidth;
        startY = window.innerHeight;
        initialAngle = -90 + (Math.random() - 0.5) * 60;
        break;
      case 3: // Left
        startX = 0;
        startY = Math.random() * window.innerHeight;
        initialAngle = (Math.random() - 0.5) * 60;
        break;
    }
    
    const length = 200 + Math.random() * 150;
    const thickness = 1.5 + Math.random() * 2;
    
    createPath(startX, startY, length, initialAngle, thickness, 0);
  }, 10000);
  
  // Update colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        // Update existing paths
        const paths = svgContainer.querySelectorAll('path');
        paths.forEach(path => {
          path.setAttribute('stroke', getRootColor());
        });
      }, 100);
    });
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
    svgContainer.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
  });
});
