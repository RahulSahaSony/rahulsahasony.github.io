// assets/js/main.js
document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.querySelector('.theme-icon');
  
  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (currentTheme === 'dark') {
    themeIcon.textContent = '☀️';
  } else {
    themeIcon.textContent = '🌙';
  }
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme;
    
    if (currentTheme === 'dark') {
      newTheme = 'light';
      themeIcon.textContent = '🌙';
    } else {
      newTheme = 'dark';
      themeIcon.textContent = '☀️';
    }
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
  
  // Mobile navigation toggle (if needed in future)
  // This is a placeholder for potential mobile menu functionality
});
