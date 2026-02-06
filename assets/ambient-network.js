document.addEventListener('DOMContentLoaded', function() {
  // Create cherry blossom container
  const blossomContainer = document.createElement('div');
  blossomContainer.className = 'cherry-blossom-container';
  blossomContainer.style.position = 'fixed';
  blossomContainer.style.top = '0';
  blossomContainer.style.left = '0';
  blossomContainer.style.width = '100%';
  blossomContainer.style.height = '100%';
  blossomContainer.style.zIndex = '-1';
  blossomContainer.style.overflow = 'hidden';
  blossomContainer.style.pointerEvents = 'none';
  document.body.appendChild(blossomContainer);
  
  // Cherry blossom colors (pink shades)
  const blossomColors = [
    '#FFB7C5', // Light pink
    '#FFC0CB', // Pink
    '#FFD1DC', // Pale pink
    '#FF69B4', // Hot pink
    '#FF1493'  // Deep pink
  ];
  
  // Function to create a single cherry blossom petal
  function createBlossom() {
    const petal = document.createElement('div');
    petal.className = 'cherry-blossom';
    
    // Random properties for natural variation
    const size = 10 + Math.random() * 15; // 10-25px
    const colorIndex = Math.floor(Math.random() * blossomColors.length);
    const color = blossomColors[colorIndex];
    const startX = Math.random() * window.innerWidth;
    const swayAmount = 30 + Math.random() * 50; // How much it sways side to side
    const fallDuration = 15 + Math.random() * 20; // 15-35 seconds
    const swayDuration = 3 + Math.random() * 4; // 3-7 seconds for sway cycle
    const delay = Math.random() * 5; // 0-5 seconds delay
    const opacity = 0.6 + Math.random() * 0.3; // 0.6-0.9 opacity
    const rotationSpeed = 20 + Math.random() * 30; // Rotation speed
    
    // Apply styles
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    petal.style.backgroundColor = color;
    petal.style.opacity = opacity;
    petal.style.left = `${startX}px`;
    petal.style.top = '-20px'; // Start above the viewport
    petal.style.borderRadius = '0 100% 0 100%'; // Petal shape
    petal.style.transform = `rotate(${Math.random() * 360}deg)`;
    petal.style.boxShadow = `0 0 ${size/2}px ${color}40`; // Soft glow
    
    // Add to container
    blossomContainer.appendChild(petal);
    
    // Animate falling
    let startTime = null;
    let initialX = startX;
    
    function animatePetal(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000; // Convert to seconds
      
      // Calculate position
      const progress = elapsed / fallDuration;
      if (progress >= 1) {
        // Animation complete, remove petal
        if (blossomContainer.contains(petal)) {
          blossomContainer.removeChild(petal);
        }
        return;
      }
      
      // Vertical position (falling)
      const y = progress * (window.innerHeight + 40); // 40px extra to ensure it goes off screen
      
      // Horizontal position (swaying)
      const swayX = Math.sin(elapsed / swayDuration * 2 * Math.PI) * swayAmount;
      const x = initialX + swayX;
      
      // Rotation
      const rotation = elapsed * rotationSpeed;
      
      // Apply transform
      petal.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;
      
      // Continue animation
      requestAnimationFrame(animatePetal);
    }
    
    // Start animation after delay
    setTimeout(() => {
      requestAnimationFrame(animatePetal);
    }, delay * 1000);
  }
  
  // Create initial blossoms
  for (let i = 0; i < 15; i++) {
    setTimeout(() => {
      createBlossom();
    }, i * 800);
  }
  
  // Continuously create new blossoms
  setInterval(createBlossom, 2000);
  
  // Adjust for theme
  function adjustForTheme() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    const petals = blossomContainer.querySelectorAll('.cherry-blossom');
    
    if (theme === 'light') {
      // Lighter colors for light theme
      const lightColors = ['#FFB7C5', '#FFC0CB', '#FFD1DC', '#FFE4E1', '#FFF0F5'];
      petals.forEach(petal => {
        const currentColor = petal.style.backgroundColor;
        // Only change if it's one of the original colors
        if (blossomColors.some(color => currentColor.includes(color.substring(1)))) {
          const newColor = lightColors[Math.floor(Math.random() * lightColors.length)];
          petal.style.backgroundColor = newColor;
          petal.style.boxShadow = `0 0 ${parseInt(petal.style.width)/2}px ${newColor}40`;
        }
      });
    } else {
      // Darker colors for dark theme
      const darkColors = ['#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFB6C1'];
      petals.forEach(petal => {
        const currentColor = petal.style.backgroundColor;
        // Only change if it's one of the original colors
        if (blossomColors.some(color => currentColor.includes(color.substring(1)))) {
          const newColor = darkColors[Math.floor(Math.random() * darkColors.length)];
          petal.style.backgroundColor = newColor;
          petal.style.boxShadow = `0 0 ${parseInt(petal.style.width)/2}px ${newColor}40`;
        }
      });
    }
  }
  
  // Listen for theme changes
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(adjustForTheme, 100);
    });
  }
  
  // Clean up old petals periodically to prevent memory issues
  setInterval(() => {
    const petals = blossomContainer.querySelectorAll('.cherry-blossom');
    if (petals.length > 50) {
      for (let i = 0; i < 10; i++) {
        if (petals[i]) {
          blossomContainer.removeChild(petals[i]);
        }
      }
    }
  }, 10000);
});
