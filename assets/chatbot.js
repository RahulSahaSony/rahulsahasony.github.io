document.addEventListener('DOMContentLoaded', function() {
  // Chatbot data about you
  const chatbotData = {
    greeting: "Hello! I'm Rahul's virtual assistant. I can tell you about his background, skills, projects, and experience. What would you like to know?",
    farewell: "Thank you for chatting! If you have more questions, feel free to ask. You can also contact Rahul directly through the contact page.",
    unknown: "I'm not sure how to answer that. You can ask me about Rahul's education, skills, projects, or work experience.",
    
    // Question-answer pairs
    qa: {
      // Personal info
      "who are you": "I'm a virtual assistant designed to answer questions about Rahul Saha.",
      "who is rahul": "Rahul Saha is a Business Analytics professional with 7+ years of experience in data-driven initiatives. He recently completed a STEM-designated MS in Business Analytics at The George Washington University.",
      "what does rahul do": "Rahul works at the intersection of data, technology, and revenue. He specializes in data analytics, machine learning, and programmatic advertising.",
      "where is rahul from": "Rahul is originally from Dhaka, Bangladesh, and is now based in Washington, DC area.",
      "rahul's location": "Rahul is currently located in Falls Church, VA, in the Washington, DC metropolitan area.",
      
      // Education
      "education": "Rahul has an MS in Business Analytics from The George Washington University and a BBA in Finance, Banking, and Insurance from the University of Information Technology & Sciences in Dhaka.",
      "what did rahul study": "Rahul studied Business Analytics at the graduate level, focusing on machine learning, optimization, time series forecasting, and responsible AI. His undergraduate degree was in Finance, Banking, and Insurance.",
      "rahul's degree": "Rahul holds a Master of Science in Business Analytics from The George Washington University and a Bachelor of Business Administration in Finance, Banking, and Insurance.",
      
      // Skills
      "skills": "Rahul's skills include programming languages (R, Python, SQL), visualization tools (Power BI, Tableau), machine learning techniques, and various analytics platforms. He also has strong business and strategy skills.",
      "what programming languages does rahul know": "Rahul is proficient in R, Python, SQL, HTML/CSS, and has experience with various data analysis libraries.",
      "rahul's technical skills": "Rahul's technical skills include machine learning (Linear Regression, Logistic Regression, Decision Trees, SVM, KNN, BERT, LSTM), data visualization (Power BI, Tableau, Matplotlib), and tools like Microsoft 365, Google Workspace, AWS, GitHub, and Streamlit.",
      
      // Experience
      "experience": "Rahul has 7+ years of experience across operations, growth strategy, and programmatic advertising. He's worked as an Extern at the International Monetary Fund, Growth & Strategy Lead at Adferry, Operations Manager at Wonderlo Inc., and Senior Analyst at Quantanite.",
      "where has rahul worked": "Rahul has worked at the International Monetary Fund, Adferry, Wonderlo Inc., Quantanite, and United Finance. He's also done consulting work through the Build Fellowship by Open Avenues.",
      "rahul's current role": "Rahul is currently an Extern in the Secretary's Department at the International Monetary Fund and a Build Student Consultant for Deploying AI Into Small Businesses through the Build Fellowship by Open Avenues.",
      
      // Projects
      "projects": "Rahul has worked on several interesting projects including LaborIQ (an intelligent career assistant), AI Beyond Defense (tackling concentration risk), and a time series forecasting model for Capital Bikeshare ridership.",
      "tell me about rahul's projects": "Rahul's projects showcase his skills in data analytics and machine learning. Notable projects include LaborIQ, which uses a dual-model architecture for career insights, and AI Beyond Defense, which helps identify national security risks using AI.",
      "laboriq": "LaborIQ is an intelligent career assistant for data science job seekers. It combines a SQL-based market-insights engine and a RAG-based LLM pipeline to deliver verified salary benchmarks, skill gaps, and career insights.",
      
      // Contact
      "how can i contact rahul": "You can contact Rahul through the contact page on this website. The best way to reach him is via email at rahulsahasony@gmail.com. He's also on LinkedIn and GitHub.",
      "rahul's email": "Rahul's email address is rahulsahasony@gmail.com.",
      "rahul's linkedin": "You can connect with Rahul on LinkedIn at linkedin.com/in/rahulsahasony.",
      "rahul's github": "You can find Rahul's projects on GitHub at github.com/rahulsahasony.",
      
      // Interests
      "rahul's interests": "Rahul is interested in roles where he can take ownership, learn quickly, and support teams wherever needed. His research interests include interpretable & responsible machine learning, optimization & decision analytics, applied econometrics & policy analytics, and human-centered AI.",
      "what is rahul looking for": "Rahul is seeking Data Analyst, Data Scientist, or Machine Learning roles where he can apply his skills in business analytics and machine learning."
    }
  };

  // Create chatbot UI
  function createChatbot() {
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.className = 'chatbot-container';
    chatbotContainer.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-avatar">
          <img src="/assets/profile-photo.jpg" alt="Rahul's Assistant">
        </div>
        <div class="chatbot-title">
          <h3>Rahul's Assistant</h3>
          <span class="chatbot-status">Online</span>
        </div>
        <button class="chatbot-close" id="chatbot-close">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <line x1="18" y1="6" x2="6" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages">
        <div class="message bot-message">
          <div class="message-content">${chatbotData.greeting}</div>
          <div class="message-time">${getCurrentTime()}</div>
        </div>
      </div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbot-input" placeholder="Ask me about Rahul..." autocomplete="off">
        <button id="chatbot-send">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polygon points="22,2 15,22 11,13 2,9 22,2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <div class="chatbot-suggestions">
        <button class="suggestion-btn" data-question="Tell me about Rahul's education">Education</button>
        <button class="suggestion-btn" data-question="What are Rahul's skills?">Skills</button>
        <button class="suggestion-btn" data-question="Tell me about Rahul's experience">Experience</button>
        <button class="suggestion-btn" data-question="How can I contact Rahul?">Contact</button>
      </div>
    `;

    // Create chatbot toggle button
    const chatbotToggle = document.createElement('button');
    chatbotToggle.className = 'chatbot-toggle';
    chatbotToggle.id = 'chatbot-toggle';
    chatbotToggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Chat</span>
    `;

    // Add to body
    document.body.appendChild(chatbotContainer);
    document.body.appendChild(chatbotToggle);

    // Add event listeners
    document.getElementById('chatbot-toggle').addEventListener('click', toggleChatbot);
    document.getElementById('chatbot-close').addEventListener('click', closeChatbot);
    document.getElementById('chatbot-send').addEventListener('click', sendMessage);
    document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });

    // Add suggestion button event listeners
    document.querySelectorAll('.suggestion-btn').forEach(button => {
      button.addEventListener('click', function() {
        const question = this.getAttribute('data-question');
        document.getElementById('chatbot-input').value = question;
        sendMessage();
      });
    });
  }

  // Toggle chatbot
  function toggleChatbot() {
    const chatbotContainer = document.querySelector('.chatbot-container');
    chatbotContainer.classList.toggle('open');
    
    if (chatbotContainer.classList.contains('open')) {
      document.getElementById('chatbot-input').focus();
    }
  }

  // Close chatbot
  function closeChatbot() {
    document.querySelector('.chatbot-container').classList.remove('open');
  }

  // Send message
  function sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response delay
    setTimeout(() => {
      hideTypingIndicator();
      const response = getResponse(message);
      addMessage(response, 'bot');
    }, 1000 + Math.random() * 1000);
  }

  // Add message to chat
  function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    messageElement.innerHTML = `
      <div class="message-content">${text}</div>
      <div class="message-time">${getCurrentTime()}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Show typing indicator
  function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbot-messages');
    const typingElement = document.createElement('div');
    typingElement.className = 'message bot-message typing-indicator';
    typingElement.id = 'typing-indicator';
    
    typingElement.innerHTML = `
      <div class="message-content">
        <div class="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    
    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Hide typing indicator
  function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  // Get response based on user input
  function getResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // Check for exact matches
    if (chatbotData.qa[lowerMessage]) {
      return chatbotData.qa[lowerMessage];
    }
    
    // Check for partial matches
    for (const question in chatbotData.qa) {
      if (lowerMessage.includes(question) || question.includes(lowerMessage)) {
        return chatbotData.qa[question];
      }
    }
    
    // Check for keywords
    if (lowerMessage.includes('education') || lowerMessage.includes('study') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
      return chatbotData.qa.education;
    }
    
    if (lowerMessage.includes('skill') || lowerMessage.includes('programming') || lowerMessage.includes('technical') || lowerMessage.includes('language')) {
      return chatbotData.qa.skills;
    }
    
    if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job') || lowerMessage.includes('career')) {
      return chatbotData.qa.experience;
    }
    
    if (lowerMessage.includes('project')) {
      return chatbotData.qa.projects;
    }
    
    if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach') || lowerMessage.includes('linkedin') || lowerMessage.includes('github')) {
      return chatbotData.qa["how can i contact rahul"];
    }
    
    if (lowerMessage.includes('who') && lowerMessage.includes('rahul')) {
      return chatbotData.qa["who is rahul"];
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! How can I help you learn more about Rahul today?";
    }
    
    if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! Is there anything else you'd like to know about Rahul?";
    }
    
    if (lowerMessage.includes('bye') || lowerMessage.includes('goodbye')) {
      return chatbotData.farewell;
    }
    
    // Default response
    return chatbotData.unknown;
  }

  // Get current time
  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  // Initialize chatbot
  createChatbot();
});
