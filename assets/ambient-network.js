document.addEventListener('DOMContentLoaded', function() {
  // Create ambient root container
  const ambientRoot = document.createElement('div');
  ambientRoot.className = 'ambient-root';
  document.body.appendChild(ambientRoot);
  
  // Update colors on theme change
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      // Force reflow to update animation
      ambientRoot.style.display = 'none';
      ambientRoot.offsetHeight; // Trigger reflow
      ambientRoot.style.display = '';
    });
  }
  
  // Handle visibility change
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      ambientRoot.style.animationPlayState = 'paused';
    } else {
      ambientRoot.style.animationPlayState = 'running';
    }
  });
});
