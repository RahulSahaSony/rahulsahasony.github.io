// assets/js/contact.js
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Create mailto link
      const mailtoLink = `mailto:rahulsahasony@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
      
      // Open email client
      window.location.href = mailtoLink;
      
      // Show status message
      formStatus.textContent = 'Opening your email client...';
      formStatus.style.color = 'var(--primary-color)';
      
      // Reset form
      contactForm.reset();
      
      // Clear status after a few seconds
      setTimeout(() => {
        formStatus.textContent = '';
      }, 3000);
    });
  }
});
