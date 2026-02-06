document.addEventListener('DOMContentLoaded', function() {
  // Create tree root container
  const treeContainer = document.createElement('div');
  treeContainer.className = 'tree-root-container';
  treeContainer.style.position = 'fixed';
  treeContainer.style.top = '0';
  treeContainer.style.left = '0';
  treeContainer.style.width = '100%';
  treeContainer.style.height = '100%';
  treeContainer.style.zIndex = '-1';
  treeContainer.style.overflow = 'hidden';
  treeContainer.style.pointerEvents = 'none';
  document.body.appendChild(treeContainer);
  
  // Function to create a single root element
  function createRoot(x, y, angle, length, delay, thickness) {
    const root = document.createElement('div');
    root.style.position = 'absolute';
    root.style.left = x + 'px';
    root.style.top = y + 'px';
    root.style.width = length + 'px';
    root.style.height = thickness + 'px';
    root.style.background = 'var(--root-color, #4a9eff)';
    root.style.transformOrigin = '0 50%';
    root.style.transform = `rotate(${angle}deg)`;
    root.style.opacity = '0';
    
    // Add animation
    root.style.animation = `growRoot 15s ease-out ${delay}s`;
    
    treeContainer.appendChild(root);
    
    // Create branches
    if (Math.random() > 0.3) {
      setTimeout(() => {
        createBranch(x + Math.cos(angle * Math.PI / 180) * length * 0.7, 
                     y + Math.sin(angle * Math.PI / 180) * length * 0.7, 
                     angle - 20, length * 0.6, delay + 2, thickness * 0.8);
      }, delay * 1000 + 1000);
    }
    
    if (Math.random() > 0.3) {
      setTimeout(() => {
        createBranch(x + Math.cos(angle * Math.PI / 180) * length * 0.7, 
                     y + Math.sin(angle * Math.PI / 180) * length * 0.7, 
                     angle + 20, length * 0.6, delay + 3, thickness * 0.8);
      }, delay * 1000 + 2000);
    }
  }
  
  // Function to create a branch
  function createBranch(x, y, angle, length, delay, thickness) {
    const branch = document.createElement('div');
    branch.style.position = 'absolute';
    branch.style.left = x + 'px';
    branch.style.top = y + 'px';
    branch.style.width = length + 'px';
    branch.style.height = thickness + 'px';
    branch.style.background = 'var(--root-color, #4a9eff)';
    branch.style.transformOrigin = '0 50%';
    branch.style.transform = `rotate(${angle}deg)`;
    branch.style.opacity = '0';
    
    // Add animation
    branch.style.animation = `growRoot 12s ease-out ${delay}s`;
    
    treeContainer.appendChild(branch);
    
    // Create sub-branches
    if (Math.random() > 0.4 && length > 30) {
      setTimeout(() => {
        createBranch(x + Math.cos(angle * Math.PI / 180) * length * 0.8, 
                     y + Math.sin(angle * Math.PI / 180) * length * 0.8, 
                     angle - 15, length * 0.5, delay + 1.5, thickness * 0.7);
      }, delay * 1000 + 800);
    }
    
    if (Math.random() > 0.4 && length > 30) {
      setTimeout(() => {
        createBranch(x + Math.cos(angle * Math.PI / 180) * length * 0.8, 
                     y + Math.sin(angle * Math.PI / 180) * length * 0.8, 
                     angle + 15, length * 0.5, delay + 2, thickness * 0.7);
      }, delay * 1000 + 1200);
    }
  }
  
  // Add the keyframes animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes growRoot {
      0% {
        width: 0;
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      80% {
        opacity: 0.3;
      }
      100% {
        width: ${document.documentElement.style.getPropertyValue('--root-max-length') || '300px'};
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Set initial root variables
  const root = document.documentElement;
  root.style.setProperty('--root-color', '#4a9eff');
  root.style.setProperty('--root-max-length', '300px');
  
  // Create initial roots from different positions
  createRoot(window.innerWidth * 0.1, window.innerHeight * 0.5, 10, 200, 0, 3);
  createRoot(window.innerWidth * 0.9, window.innerHeight * 0.3, -170, 180, 1, 2.5);
  createRoot(window.innerWidth * 0.2, window.innerHeight * 0.8, 30, 220, 2, 3.5);
  createRoot(window.innerWidth * 0.8, window.innerHeight * 0.7, -190, 160, 3, 2);
  createRoot(window.innerWidth * 0.5, window.innerHeight * 0.9, 0, 190, 4, 2.8);
  
  // Periodically add new roots
  setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const angle = Math.random() * 360;
    const length = 150 + Math.random() * 100;
    const delay = 0;
    const thickness = 2 + Math.random() * 2;
    
    createRoot(x, y, angle, length, delay, thickness);
  }, 8000);
  
  // Update colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        const theme = document.documentElement.getAttribute('data-theme') || 'dark';
        if (theme === 'light') {
          root.style.setProperty('--root-color', '#1e66d0');
        } else {
          root.style.setProperty('--root-color', '#4a9eff');
        }
      }, 100);
    });
  }
  
  // Clean up old roots periodically to prevent memory issues
  setInterval(() => {
    const roots = treeContainer.querySelectorAll('div');
    if (roots.length > 50) {
      for (let i = 0; i < 10; i++) {
        if (roots[i]) {
          treeContainer.removeChild(roots[i]);
        }
      }
    }
  }, 15000);
});
