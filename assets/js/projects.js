// assets/js/projects.js
document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      
      // Filter projects
      projectItems.forEach(item => {
        if (filter === 'all') {
          item.style.display = 'block';
        } else {
          const tags = item.getAttribute('data-tags');
          if (tags && tags.includes(filter)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
});
