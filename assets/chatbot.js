// chatbot.js - RAG-based Chatbot System
// Answers questions using ONLY information from the retrieved profile context.
// If the answer is not in the context, responds with: "I don't have that information yet."

// Inject chatbot HTML into the page
function createChatbotHTML() {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <button class="chatbot-toggle" id="chatbot-toggle" aria-label="Open chat">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Chat</span>
    </button>
    <div class="chatbot-container" id="chatbot-container">
      <div class="chatbot-header">
        <div class="chatbot-avatar">
          <img src="/assets/profile-photo.jpg" alt="Rahul Saha">
        </div>
        <div class="chatbot-title">
          <h3>Rahul's Assistant</h3>
          <div class="chatbot-status">Online</div>
        </div>
        <button class="chatbot-close" id="chatbot-close" aria-label="Close chat">✕</button>
      </div>
      <div class="chatbot-messages" id="chatbot-messages"></div>
      <div class="chatbot-suggestions" id="chatbot-suggestions">
        <button class="suggestion-btn">What are your skills?</button>
        <button class="suggestion-btn">Tell me about your projects</button>
        <button class="suggestion-btn">Work experience?</button>
        <button class="suggestion-btn">Education background?</button>
        <button class="suggestion-btn">How to contact you?</button>
      </div>
      <div class="chatbot-input-container">
        <input type="text" id="chatbot-input" placeholder="Ask me anything..." autocomplete="off" />
        <button id="chatbot-send" aria-label="Send message">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="20" height="20">
            <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polygon points="22,2 15,22 11,13 2,9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(wrapper);
}

// Build RAG knowledge base from profile data
function buildKnowledgeBase() {
  const kb = [];

  // About / General
  kb.push({
    content: `${profile.name} is a ${profile.headline}. ${profile.subheadline}`,
    keywords: ['who', 'background', 'rahul', 'saha', 'yourself', 'overview', 'summary']
  });

  if (profile.nowStatement) {
    kb.push({
      content: `Currently: ${profile.nowStatement}`,
      keywords: ['currently', 'now', 'focus', 'working on', 'latest']
    });
  }

  // Skills
  if (profile.skills) {
    Object.entries(profile.skills).forEach(([category, items]) => {
      kb.push({
        content: `${category}: ${items.join(', ')}`,
        keywords: ['skill', 'technical', 'expertise', 'proficient', 'tools', 'languages', category.toLowerCase(),
          ...items.map(i => i.toLowerCase())]
      });
    });
  }

  // Projects
  if (profile.projects) {
    profile.projects.forEach(project => {
      const techStr = project.technologies ? project.technologies.join(', ') : '';
      kb.push({
        content: `${project.title}: ${project.description} Impact: ${project.impact}. Technologies used: ${techStr}.`,
        keywords: ['project', 'portfolio', 'built', 'created', 'developed', project.title.toLowerCase(),
          ...(project.technologies || []).map(t => t.toLowerCase())]
      });
    });
  }

  // Experience
  if (profile.experience) {
    profile.experience.forEach(exp => {
      const highlights = exp.bullets ? exp.bullets.slice(0, 2).join(' ') : '';
      kb.push({
        content: `${exp.role} at ${exp.company} (${exp.dates}): ${highlights}`,
        keywords: ['experience', 'work', 'career', 'job', 'role', exp.role.toLowerCase(), exp.company.toLowerCase()]
      });
    });
  }

  // Education
  if (profile.education) {
    profile.education.forEach(edu => {
      const awards = edu.awards && edu.awards.length > 0 ? ` Awards: ${edu.awards.join(', ')}.` : '';
      kb.push({
        content: `${edu.degree} from ${edu.school} (${edu.dates}).${awards}`,
        keywords: ['education', 'degree', 'university', 'college', 'master', 'bachelor', 'study', 'graduated',
          edu.school.toLowerCase(), edu.degree.toLowerCase()]
      });
    });
  }

  // Contact
  if (profile.contact) {
    kb.push({
      content: `Contact ${profile.name}: Email: ${profile.contact.email}. LinkedIn: ${profile.contact.linkedin}. GitHub: ${profile.contact.github}. Location: ${profile.contact.location}. ${profile.contact.bestWayToReach || ''}`,
      keywords: ['contact', 'email', 'reach', 'linkedin', 'github', 'social', 'location', 'message', 'connect', 'hire']
    });
  }

  // Certifications
  if (profile.certifications && profile.certifications.length > 0) {
    const certNames = profile.certifications.map(c => `${c.name} (${c.issuer})`).join('; ');
    kb.push({
      content: `Certifications include: ${certNames}`,
      keywords: ['certification', 'certificate', 'certified', 'credential', 'course', 'training']
    });
  }

  // Research Interests
  if (profile.researchInterests && profile.researchInterests.length > 0) {
    kb.push({
      content: `Research interests: ${profile.researchInterests.join(', ')}`,
      keywords: ['research', 'interest', 'academic', 'study', 'topics', 'curious']
    });
  }

  return kb;
}

// Initialize Chatbot
document.addEventListener('DOMContentLoaded', () => {
  createChatbotHTML();

  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  const chatbotSuggestions = document.getElementById('chatbot-suggestions');

  if (!chatbotToggle || !chatbotContainer) return;

  const knowledgeBase = buildKnowledgeBase();

  // Toggle chatbot window
  chatbotToggle.addEventListener('click', () => {
    chatbotContainer.classList.toggle('open');

    if (chatbotContainer.classList.contains('open')) {
      setTimeout(() => chatbotInput && chatbotInput.focus(), 300);

      // Show welcome message on first open
      if (chatbotMessages && chatbotMessages.children.length === 0) {
        addMessage('bot', `Hi! I can answer questions about ${profile.name}'s skills, projects, experience, and how to get in touch. What would you like to know?`);
      }
    }
  });

  // Close chatbot
  if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
      chatbotContainer.classList.remove('open');
    });
  }

  // Send message
  const sendMessage = () => {
    if (!chatbotInput) return;
    const message = chatbotInput.value.trim();
    if (!message) return;

    addMessage('user', message);
    chatbotInput.value = '';

    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const response = generateRAGResponse(message, knowledgeBase);
      addMessage('bot', response);
    }, 600 + Math.random() * 600);
  };

  if (chatbotSend) chatbotSend.addEventListener('click', sendMessage);

  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }

  // Suggestion buttons
  if (chatbotSuggestions) {
    chatbotSuggestions.querySelectorAll('.suggestion-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        if (chatbotInput) {
          chatbotInput.value = btn.textContent;
          sendMessage();
        }
      });
    });
  }

  // Message helpers (scoped to closure for DOM references)
  function addMessage(sender, text) {
    if (!chatbotMessages) return;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const div = document.createElement('div');
    div.className = `message ${sender === 'bot' ? 'bot-message' : 'user-message'}`;
    div.innerHTML = `
      <div class="message-content">${escapeHTML(text)}</div>
      <div class="message-time">${time}</div>
    `;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function showTypingIndicator() {
    if (!chatbotMessages) return;
    const div = document.createElement('div');
    div.className = 'message bot-message typing-indicator';
    div.innerHTML = `
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
    chatbotMessages.appendChild(div);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function removeTypingIndicator() {
    const indicator = chatbotMessages && chatbotMessages.querySelector('.typing-indicator');
    if (indicator) indicator.remove();
  }

  // Expose for external use
  window.ChatbotApp = { generateRAGResponse };
});

// Escape HTML to prevent XSS
function escapeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// RAG Response Generation
function generateRAGResponse(query, knowledgeBase) {
  const lowerQuery = query.toLowerCase();

  // Politely decline personal, private, or clearly unrelated questions
  const offTopicPatterns = ['password', 'salary', 'address', 'phone number', 'relationship', 'girlfriend', 'boyfriend', 'wife', 'husband', 'age', 'political', 'religion'];
  if (offTopicPatterns.some(p => lowerQuery.includes(p))) {
    return `I'd rather keep the focus on ${profile.name}'s professional background. Feel free to ask about his skills, projects, or experience!`;
  }

  const retrieved = retrieveContext(lowerQuery, knowledgeBase);

  if (retrieved.length === 0) {
    return "I don't have that information yet.";
  }

  return generateAnswer(retrieved, lowerQuery);
}

// Context Retrieval via keyword matching
function retrieveContext(query, knowledgeBase) {
  const results = [];

  // Primary: keyword match (skip single-char keywords to avoid false positives)
  knowledgeBase.forEach(item => {
    const matched = item.keywords.some(kw => kw.length > 1 && query.includes(kw));
    if (matched) results.push(item.content);
  });

  // Fallback: word-level partial match
  if (results.length === 0) {
    const words = query.split(/\s+/).filter(w => w.length > 2);
    knowledgeBase.forEach(item => {
      if (results.length >= 3) return;
      const contentLower = item.content.toLowerCase();
      const matches = words.some(w => contentLower.includes(w));
      if (matches) results.push(item.content);
    });
  }

  return results;
}

// Answer Generation — merges retrieved context into one clear, direct answer
function generateAnswer(context, query) {
  if (context.length === 1) return context[0];

  // Return the most relevant chunks merged; cap at 3 to stay concise
  return context.slice(0, 3).join('\n\n');
}
