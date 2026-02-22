// chatbot.js - RAG-based Chatbot System

// DOM Elements
const chatbotToggle = document.querySelector('.chatbot-toggle');
const chatbotWindow = document.querySelector('.chatbot-window');
const chatbotClose = document.querySelector('.chatbot-close');
const chatbotInput = document.querySelector('.chatbot-input');
const chatbotSend = document.querySelector('.chatbot-send');
const chatbotMessages = document.querySelector('.chatbot-messages');

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', initChatbot);

function initChatbot() {
  if (!chatbotToggle || !chatbotWindow) return;
  
  // Toggle chatbot window
  chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    
    if (chatbotWindow.classList.contains('active')) {
      setTimeout(() => {
        chatbotInput.focus();
      }, 300);
      
      // Add welcome message on first open
      if (chatbotMessages.children.length === 0) {
        addChatbotMessage('bot', 'Hello! I\'m Jeremy\'s portfolio assistant. I can answer questions about his skills, projects, and experience. What would you like to know?');
      }
    }
  });
  
  // Close chatbot
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });
  }
  
  // Send message functionality
  const sendMessage = () => {
    const message = chatbotInput.value.trim();
    
    if (message) {
      addChatbotMessage('user', message);
      chatbotInput.value = '';
      
      showTypingIndicator();
      
      // Generate and display response
      setTimeout(() => {
        removeTypingIndicator();
        const response = generateRAGResponse(message);
        addChatbotMessage('bot', response);
      }, 800 + Math.random() * 700);
    }
  };
  
  // Event listeners for sending messages
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

// Message Management
function addChatbotMessage(sender, message) {
  if (!chatbotMessages) return;
  
  const messageElement = document.createElement('div');
  messageElement.className = `chatbot-message ${sender}`;
  messageElement.textContent = message;
  
  chatbotMessages.appendChild(messageElement);
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

// RAG Knowledge Base
const knowledgeBase = {
  about: [
    {
      content: "Jeremy is a data analytics professional with over 5 years of experience in transforming complex data into actionable insights.",
      keywords: ["jeremy", "about", "who", "background", "experience"]
    },
    {
      content: "He specializes in data visualization, statistical analysis, and machine learning, helping businesses make data-driven decisions.",
      keywords: ["specializes", "specialization", "expertise", "focus"]
    },
    {
      content: "Jeremy holds a Master's degree in Data Science from Stanford University and a Bachelor's in Computer Science from UC Berkeley.",
      keywords: ["education", "degree", "university", "college", "master", "bachelor"]
    }
  ],
  skills: [
    {
      content: "Technical skills: Python, R, SQL, Tableau, Power BI, Excel, TensorFlow, PyTorch, scikit-learn, and AWS cloud services.",
      keywords: ["skills", "technical", "python", "r", "sql", "tableau", "power bi", "excel", "tensorflow", "pytorch", "scikit-learn", "aws"]
    },
    {
      content: "Analytics expertise: Predictive modeling, time series forecasting, customer segmentation, A/B testing, and sentiment analysis.",
      keywords: ["analytics", "predictive", "forecasting", "segmentation", "testing", "sentiment", "modeling"]
    },
    {
      content: "Business skills: Project management, stakeholder communication, cross-functional collaboration, and strategic planning.",
      keywords: ["business", "management", "communication", "collaboration", "planning", "stakeholder"]
    }
  ],
  projects: [
    {
      content: "Customer Segmentation Project: Developed a clustering model that identified 5 distinct customer segments, leading to a 23% increase in targeted marketing ROI.",
      keywords: ["customer segmentation", "clustering", "marketing", "roi", "project"]
    },
    {
      content: "Sales Forecasting System: Built a time series forecasting model using LSTM that improved sales prediction accuracy by 35% for a retail client.",
      keywords: ["sales", "forecasting", "lstm", "prediction", "accuracy", "retail"]
    },
    {
      content: "Sentiment Analysis Dashboard: Created a real-time sentiment analysis tool for social media data, processing 10K+ posts daily with 92% accuracy.",
      keywords: ["sentiment", "dashboard", "social media", "real-time", "accuracy", "analysis"]
    },
    {
      content: "Supply Chain Optimization: Developed a predictive model that reduced inventory costs by 18% while maintaining 99% product availability.",
      keywords: ["supply chain", "optimization", "inventory", "costs", "availability"]
    }
  ],
  experience: [
    {
      content: "Senior Data Analyst at TechCorp (2021-Present): Lead analytics initiatives for product development, managing a team of 3 analysts.",
      keywords: ["techcorp", "senior", "lead", "team", "analyst", "current", "present"]
    },
    {
      content: "Data Analyst at DataDriven Inc. (2019-2021): Developed predictive models for customer behavior and created executive dashboards.",
      keywords: ["datadriven", "analyst", "predictive", "dashboards", "executive", "2019", "2021"]
    },
    {
      content: "Junior Data Analyst at StartUp Analytics (2018-2019): Performed data cleaning, exploratory analysis, and created automated reports.",
      keywords: ["startup", "junior", "cleaning", "exploratory", "reports", "2018", "2019"]
    }
  ],
  contact: [
    {
      content: "Jeremy can be contacted via email at jeremy@example.com or through the contact form on this website.",
      keywords: ["contact", "email", "reach", "form", "jeremy@example.com"]
    },
    {
      content: "Professional profiles: LinkedIn at linkedin.com/in/jeremydata and GitHub at github.com/jeremyanalytics.",
      keywords: ["linkedin", "github", "profile", "social", "professional"]
    },
    {
      content: "Response time: Jeremy typically responds to inquiries within 24-48 hours during business days.",
      keywords: ["response", "time", "reply", "hours", "business"]
    }
  ]
};

// RAG Response Generation
function generateRAGResponse(query) {
  const lowerQuery = query.toLowerCase();
  const retrievedContext = retrieveContext(lowerQuery);
  
  if (retrievedContext.length === 0) {
    return "I don't have that information yet.";
  }
  
  return generateAnswer(retrievedContext, query);
}

// Context Retrieval
function retrieveContext(query) {
  const relevantContext = [];
  
  // Primary keyword matching
  Object.values(knowledgeBase).forEach(category => {
    category.forEach(item => {
      const hasKeyword = item.keywords.some(keyword => 
        query.includes(keyword) || keyword.includes(query)
      );
      
      if (hasKeyword) {
        relevantContext.push(item.content);
      }
    });
  });
  
  // Fallback fuzzy matching if no direct matches
  if (relevantContext.length === 0) {
    Object.values(knowledgeBase).forEach(category => {
      category.forEach(item => {
        const queryWords = query.split(' ').filter(word => word.length > 2);
        const contentLower = item.content.toLowerCase();
        
        const hasPartialMatch = queryWords.some(word => 
          contentLower.includes(word) || word.includes(contentLower)
        );
        
        if (hasPartialMatch && relevantContext.length < 3) {
          relevantContext.push(item.content);
        }
      });
    });
  }
  
  return relevantContext;
}

// Answer Generation
function generateAnswer(context, query) {
  if (context.length === 1) {
    return context[0];
  }
  
  let answer = "";
  
  // Structured responses based on query type
  if (query.includes('skill') || query.includes('technical') || query.includes('expertise')) {
    answer = "Jeremy's key skills include: ";
    answer += context.slice(0, 2).join(' He also has experience in ');
  } else if (query.includes('project') || query.includes('work') || query.includes('portfolio')) {
    answer = "Jeremy has worked on several projects: ";
    answer += context[0] + " Another notable project: " + context[1];
  } else if (query.includes('experience') || query.includes('career') || query.includes('work history')) {
    answer = "Jeremy's experience includes: ";
    answer += context.join(' Previously, ');
  } else if (query.includes('contact') || query.includes('email') || query.includes('reach')) {
    answer = context[0];
  } else {
    // Generic response for other queries
    answer = context[0];
    if (context.length > 1) {
      answer += " Additionally, " + context[1];
    }
  }
  
  return answer;
}

// Export for potential use in other scripts
window.ChatbotApp = {
  generateRAGResponse,
  retrieveContext,
  knowledgeBase,
  addChatbotMessage
};
