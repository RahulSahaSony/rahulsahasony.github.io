// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
  // Navigation elements
  const navMenu = document.querySelector('.nav-menu');
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Theme toggle elements
  const themeToggle = document.getElementById('theme-toggle');
  const themeIconLight = document.querySelector('.theme-icon-light');
  const themeIconDark = document.querySelector('.theme-icon-dark');
  
  // Contact form elements
  const contactForm = document.getElementById('contact-form');
  const formNotification = document.getElementById('form-notification');
  
  // Chatbot elements
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbotWindow = document.querySelector('.chatbot-window');
  const chatbotClose = document.querySelector('.chatbot-close');
  const chatbotInput = document.querySelector('.chatbot-input');
  const chatbotSend = document.querySelector('.chatbot-send');
  const chatbotMessages = document.querySelector('.chatbot-messages');
  
  // Typing animation elements
  const typingElements = document.querySelectorAll('.typing-text');
  
  // Initialize theme
  initTheme();
  
  // Initialize navigation
  initNavigation();
  
  // Initialize contact form
  initContactForm();
  
  // Initialize chatbot
  initChatbot();
  
  // Initialize typing animations
  initTypingAnimations();
  
  // Initialize ambient network
  initAmbientNetwork();
  
  // Initialize scroll animations
  initScrollAnimations();
  
  // Initialize project filtering (if applicable)
  initProjectFiltering();
  
  // Initialize back to top button
  initBackToTop();
  
  // Functions
  function initTheme() {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    // Apply the theme
    document.documentElement.setAttribute('data-theme', theme);
    
    // Update theme toggle icons
    updateThemeToggleIcons(theme);
    
    // Listen for theme toggle clicks
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        updateThemeToggleIcons(newTheme);
      }
    });
  }
  
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    updateThemeToggleIcons(newTheme);
    
    // Update ambient network colors
    if (window.ambientNetwork) {
      window.ambientNetwork.updateColors();
    }
  }
  
  function updateThemeToggleIcons(theme) {
    if (themeIconLight && themeIconDark) {
      if (theme === 'dark') {
        themeIconLight.style.display = 'none';
        themeIconDark.style.display = 'block';
      } else {
        themeIconLight.style.display = 'block';
        themeIconDark.style.display = 'none';
      }
    }
  }
  
  function initNavigation() {
    // Mobile menu toggle
    if (mobileMenuToggle && navMenu) {
      mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Update ARIA attributes
        const isExpanded = navMenu.classList.contains('active');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
      });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu && navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
    
    // Smooth scrolling for anchor links
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Check if it's an internal link
        if (href.startsWith('#')) {
          e.preventDefault();
          
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
    
    // Active navigation highlighting
    highlightActiveNavigation();
    
    // Update on scroll
    window.addEventListener('scroll', () => {
      highlightActiveNavigation();
    });
  }
  
  function highlightActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100;
      const sectionId = section.getAttribute('id');
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  
  function initContactForm() {
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(contactForm);
      const formObject = Object.fromEntries(formData.entries());
      
      // Validate form
      if (!validateForm(formObject)) {
        showFormNotification('Please fill in all required fields.', 'error');
        return;
      }
      
      // Show loading state
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      try {
        // Simulate form submission (replace with actual endpoint)
        await simulateFormSubmission(formObject);
        
        // Show success message
        showFormNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
      } catch (error) {
        // Show error message
        showFormNotification('Something went wrong. Please try again later.', 'error');
        console.error('Form submission error:', error);
      } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }
    });
  }
  
  function validateForm(formData) {
    const requiredFields = ['name', 'email', 'message'];
    
    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === '') {
        return false;
      }
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return false;
    }
    
    return true;
  }
  
  function showFormNotification(message, type) {
    if (!formNotification) return;
    
    formNotification.textContent = message;
    formNotification.className = `form-notification ${type}`;
    formNotification.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
      formNotification.style.display = 'none';
    }, 5000);
  }
  
  async function simulateFormSubmission(formData) {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', formData);
        resolve();
      }, 1500);
    });
  }
  
  function initChatbot() {
    if (!chatbotToggle || !chatbotWindow) return;
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
      
      if (chatbotWindow.classList.contains('active')) {
        // Focus on input when opened
        setTimeout(() => {
          chatbotInput.focus();
        }, 300);
        
        // Add welcome message if it's the first time opening
        if (chatbotMessages.children.length === 0) {
          addChatbotMessage('bot', 'Hello! I\'m a virtual assistant for Jeremy\'s portfolio. How can I help you today?');
        }
      }
    });
    
    // Close chatbot
    if (chatbotClose) {
      chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
      });
    }
    
    // Send message
    const sendMessage = () => {
      const message = chatbotInput.value.trim();
      
      if (message) {
        // Add user message
        addChatbotMessage('user', message);
        
        // Clear input
        chatbotInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Generate bot response
        setTimeout(() => {
          removeTypingIndicator();
          const response = generateBotResponse(message);
          addChatbotMessage('bot', response);
        }, 1000 + Math.random() * 1000);
      }
    };
    
    if (chatbotSend) {
      chatbotSend.addEventListener('click', sendMessage);
    }
    
    if (chatbotInput) {
      chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          sendMessage();
        }
      });
    }
  }
  
  function addChatbotMessage(sender, message) {
    if (!chatbotMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `chatbot-message ${sender}`;
    messageElement.textContent = message;
    
    chatbotMessages.appendChild(messageElement);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function showTypingIndicator() {
    if (!chatbotMessages) return;
    
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    
    chatbotMessages.appendChild(typingIndicator);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function removeTypingIndicator() {
    const typingIndicator = document.querySelector('.typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }
  
  function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hello! How can I help you with Jeremy\'s portfolio today?';
    } else if (lowerMessage.includes('who') || lowerMessage.includes('about')) {
      return 'Jeremy is a data analytics professional with expertise in data visualization, statistical analysis, and machine learning. You can learn more about him in the About section.';
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('expertise')) {
      return 'Jeremy has skills in Python, R, SQL, Tableau, Power BI, Excel, and various machine learning frameworks. Check out the Skills section for more details.';
    } else if (lowerMessage.includes('project')) || lowerMessage.includes('work')) {
      return 'Jeremy has worked on various data analytics projects including customer segmentation, sales forecasting, and sentiment analysis. You can view them in the Projects section.';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email')) {
      return 'You can contact Jeremy through the contact form on this website or via email at jeremy@example.com.';
    } else if (lowerMessage.includes('resume') || lowerMessage.includes('cv')) {
      return 'You can view Jeremy\'s resume in the Resume section of this website.';
    } else if (lowerMessage.includes('thank')) {
      return 'You\'re welcome! Is there anything else I can help you with?';
    } else if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return 'Thank you for visiting! Feel free to reach out if you have any more questions.';
    } else {
      return 'I\'m not sure how to respond to that. You can ask me about Jeremy\'s skills, projects, or how to contact him.';
    }
  }
  
  function initTypingAnimations() {
    if (typingElements.length === 0) return;
    
    typingElements.forEach(element => {
      const text = element.getAttribute('data-text') || element.textContent;
      const speed = parseInt(element.getAttribute('data-speed')) || 50;
      
      // Clear the element
      element.textContent = '';
      
      // Start typing animation
      typeText(element, text, speed);
    });
  }
  
  function typeText(element, text, speed) {
    let i = 0;
    
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    
    type();
  }
  
  function initAmbientNetwork() {
    const canvas = document.getElementById('ambient-network');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    
    // Set canvas size
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Get theme colors
    function getThemeColors() {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      return {
        particle: isDark ? 'rgba(255, 255, 255, 0.3)' : 'rgba(93, 124, 91, 0.3)',
        line: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(93, 124, 91, 0.1)'
      };
    }
    
    // Create particles
    function createParticles() {
      particles = [];
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 15000));
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 2 + 1
        });
      }
    }
    
    // Draw particles and connections
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const colors = getThemeColors();
      
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = colors.line;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Draw particles
      particles.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = colors.particle;
        ctx.fill();
      });
      
      // Update particle positions
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Bounce off walls
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.vx = -particle.vx;
        }
        if (particle.y < 0 || particle.y > canvas.height) {
          particle.vy = -particle.vy;
        }
      });
      
      animationId = requestAnimationFrame(draw);
    }
    
    // Initialize and start animation
    createParticles();
    draw();
    
    // Store reference for theme updates
    window.ambientNetwork = {
      updateColors: () => {
        // Colors will be updated on next frame
      },
      destroy: () => {
        cancelAnimationFrame(animationId);
        window.removeEventListener('resize', resizeCanvas);
      }
    };
  }
  
  function initScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);
    
    // Observe elements with animation class
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
  }
  
  function initProjectFiltering() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length === 0 || projectCards.length === 0) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Filter projects
        const filter = button.getAttribute('data-filter');
        
        projectCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }
  
  function initBackToTop() {
    // Create back to top button
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'back-to-top';
    backToTopButton.innerHTML = '↑';
    backToTopButton.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(backToTopButton);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
      } else {
        backToTopButton.classList.remove('show');
      }
    });
    
    // Scroll to top when clicked
    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Add CSS for back to top button
  const backToTopStyles = `
    .back-to-top {
      position: fixed;
      bottom: 24px;
      left: 24px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: var(--primary);
      color: var(--button-text);
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: bold;
      box-shadow: 0 4px 12px var(--shadow);
      opacity: 0;
      visibility: hidden;
      transform: translateY(20px);
      transition: var(--transition);
      z-index: 100;
    }
    
    .back-to-top.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    
    .back-to-top:hover {
      background-color: var(--primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 6px 16px var(--shadow-hover);
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  
  // Add styles to head
  const styleSheet = document.createElement('style');
  styleSheet.textContent = backToTopStyles;
  document.head.appendChild(styleSheet);
});

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Export functions for potential use in other scripts
window.PortfolioApp = {
  debounce,
  throttle
};