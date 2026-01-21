document.addEventListener('DOMContentLoaded', function() {
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;
  
  // Check for saved theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  htmlElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const theme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      htmlElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
      updateThemeIcon(theme);
    });
  }
  
  function updateThemeIcon(theme) {
    if (themeToggle) {
      themeToggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
  }
  
  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Active nav link
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath || 
        (currentPath === '/' && link.getAttribute('href') === '/index.html') ||
        (currentPath.endsWith('/') && link.getAttribute('href') === currentPath + 'index.html')) {
      link.classList.add('active');
    }
  });
  
  // Project filtering
  const filterChips = document.querySelectorAll('.filter-chip');
  const projectCards = document.querySelectorAll('.project-card');
  
  if (filterChips.length > 0 && projectCards.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', function() {
        // Update active chip
        filterChips.forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        
        // Filter projects
        const filter = this.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all') {
            card.style.display = 'flex';
          } else {
            const tags = card.getAttribute('data-tags').split(',');
            if (tags.includes(filter)) {
              card.style.display = 'flex';
            } else {
              card.style.display = 'none';
            }
          }
        });
      });
    });
  }
  
  // Resume download and print
  const downloadBtn = document.getElementById('download-resume');
  const printBtn = document.getElementById('print-resume');
  
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const resumePath = profile.resumePdf;
      const link = document.createElement('a');
      link.href = resumePath;
      link.download = 'Rahul_Saha_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
  }
  
  if (printBtn) {
    printBtn.addEventListener('click', function() {
      window.print();
    });
  }
});
