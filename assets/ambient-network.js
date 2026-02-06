document.addEventListener('DOMContentLoaded', function() {
  // Create tree root container
  const treeContainer = document.createElement('div');
  treeContainer.className = 'tree-root-container';
  document.body.appendChild(treeContainer);
  
  // Create multiple tree root origins
  const origins = [
    { class: 'tree-origin-1', branches: 3 },
    { class: 'tree-origin-2', branches: 2 },
    { class: 'tree-origin-3', branches: 4 },
    { class: 'tree-origin-4', branches: 2 },
    { class: 'tree-origin-5', branches: 3 }
  ];
  
  origins.forEach((origin, index) => {
    const mainRoot = document.createElement('div');
    mainRoot.className = `tree-root ${origin.class}`;
    treeContainer.appendChild(mainRoot);
    
    // Create sub-branches
    for (let i = 0; i < origin.branches; i++) {
      setTimeout(() => {
        const subBranch = document.createElement('div');
        subBranch.className = 'tree-sub-branch';
        subBranch.style.top = `${Math.random() * 100}px`;
        subBranch.style.left = `${Math.random() * 100}px`;
        subBranch.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
        subBranch.style.animationDelay = `${Math.random() * 5}s`;
        treeContainer.appendChild(subBranch);
      }, index * 1000 + i * 500);
    }
  });
  
  // Function to update root variables dynamically
  function updateRootVariables() {
    const root = document.documentElement;
    const theme = root.getAttribute('data-theme') || 'dark';
    
    if (theme === 'light') {
      root.style.setProperty('--root-color', '#1e66d0');
      root.style.setProperty('--root-opacity', '0.25');
      root.style.setProperty('--root-thickness', '1.5px');
      root.style.setProperty('--root-growth-speed', '35s');
    } else {
      root.style.setProperty('--root-color', '#4a9eff');
      root.style.setProperty('--root-opacity', '0.3');
      root.style.setProperty('--root-thickness', '2px');
      root.style.setProperty('--root-growth-speed', '30s');
    }
  }
  
  // Update colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(() => {
        updateRootVariables();
        // Regenerate tree with new theme
        treeContainer.innerHTML = '';
        origins.forEach((origin, index) => {
          const mainRoot = document.createElement('div');
          mainRoot.className = `tree-root ${origin.class}`;
          treeContainer.appendChild(mainRoot);
          
          for (let i = 0; i < origin.branches; i++) {
            setTimeout(() => {
              const subBranch = document.createElement('div');
              subBranch.className = 'tree-sub-branch';
              subBranch.style.top = `${Math.random() * 100}px`;
              subBranch.style.left = `${Math.random() * 100}px`;
              subBranch.style.transform = `rotate(${Math.random() * 60 - 30}deg)`;
              subBranch.style.animationDelay = `${Math.random() * 5}s`;
              treeContainer.appendChild(subBranch);
            }, index * 1000 + i * 500);
          }
        });
      }, 100);
    });
  }
  
  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    const allRoots = treeContainer.querySelectorAll('.tree-root, .tree-sub-branch');
    if (document.hidden) {
      allRoots.forEach(root => root.style.animationPlayState = 'paused');
    } else {
      allRoots.forEach(root => root.style.animationPlayState = 'running');
    }
  });
  
  // Dynamic growth based on scroll
  let ticking = false;
  function updateGrowthOnScroll() {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = scrollY / maxScroll;
    
    const root = document.documentElement;
    root.style.setProperty('--root-curve-intensity', 0.3 + scrollProgress * 0.4);
    root.style.setProperty('--root-spread-angle', `${45 + scrollProgress * 30}deg`);
    root.style.setProperty('--root-opacity', `${0.3 - scrollProgress * 0.1}`);
    
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateGrowthOnScroll);
      ticking = true;
    }
  });
  
  // Periodically add new growth
  setInterval(() => {
    if (treeContainer.children.length < 50) { // Limit total elements
      const newBranch = document.createElement('div');
      newBranch.className = 'tree-sub-branch';
      newBranch.style.top = `${Math.random() * 100}%`;
      newBranch.style.left = `${Math.random() * 100}%`;
      newBranch.style.transform = `rotate(${Math.random() * 90 - 45}deg)`;
      treeContainer.appendChild(newBranch);
      
      // Remove old branches to prevent memory issues
      if (treeContainer.children.length > 40) {
        treeContainer.removeChild(treeContainer.firstChild);
      }
    }
  }, 5000);
  
  // Initialize
  updateRootVariables();
});
