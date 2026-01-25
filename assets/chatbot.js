document.addEventListener("DOMContentLoaded", function () {
  // Chatbot data about you
  const chatbotData = {
    greeting: [
      "Hello! I'm Rahul's virtual assistant. I can tell you about his background, skills, projects, and experience. I can also help with simple calculations. What would you like to know?",
      "Hi! I'm Rahul Saha's virtual assistant. I can answer questions about Rahul and help with basic math. How can I help?",
      "Hey there! Want to know about Rahul's skills, projects, or need help with a calculation?",
      "Welcome! What would you like to know about Rahul Saha? I can also help with simple math problems.",
    ],

    farewell: [
      "Thank you for chatting! If you have more questions, feel free to ask. You can also contact Rahul directly through the contact page.",
      "Happy to help. Feel free to come back anytime.",
      "Goodbye! You can reach Rahul via the contact page.",
      "Take care, and thanks for visiting Rahul's portfolio.",
    ],

    unknown: [
      "Sorry, I don't have an answer for that yet.",
      "I'm not sure how to answer that. You can ask me about Rahul's education, skills, projects, or work experience.",
      "I didn't quite understand that. Try asking something about Rahul's background or a simple calculation.",
      "That's a good question, but I don't have that information right now.",
    ],

    // Math responses
    mathResponses: [
      "Let me calculate that for you.",
      "I can help with that calculation.",
      "Here's the result of that calculation:",
      "I've calculated that for you:",
    ],

    // Question-answer pairs
    qa: {
      // =========================
      // Identity & Basics
      // =========================
      "hello": "Hi! I'm Rahul Saha's virtual assistant. Ask me anything about his background, skills, or work.",
      "hi": "Hello! I can help you learn more about Rahul Saha.",
      "who are you": "I'm a virtual assistant designed to answer questions about Rahul Saha.",
      "who is rahul": "Rahul Saha is a data and analytics professional with 7+ years of experience across analytics, operations, and programmatic advertising.",
      "tell me about rahul": "Rahul Saha is a Business Analytics graduate from GWU with strong experience in data analytics, machine learning, and business strategy.",
      "what does rahul do": "Rahul works at the intersection of data, technology, and business. He builds analytics and ML solutions that support real-world decisions.",
      "rahul background": "Rahul has a strong mix of industry experience and academic training in analytics, machine learning, and operations.",
      "where is rahul from": "Rahul is originally from Dhaka, Bangladesh.",
      "where does rahul live": "Rahul is based in Falls Church, Virginia, in the Washington, DC metro area.",
      "rahul nationality": "Rahul is originally from Bangladesh and currently based in the United States.",
      "rahul age": "Rahul prefers to focus on his work and experience rather than age.",

      // =========================
      // Education
      // =========================
      "education": "Rahul holds a Master of Science in Business Analytics from The George Washington University and a BBA in Finance, Banking, and Insurance.",
      "rahul education": "Rahul completed his MS in Business Analytics (STEM) at GWU and his undergraduate degree in Finance, Banking, and Insurance in Bangladesh.",
      "what did rahul study": "He studied Business Analytics at the graduate level and Finance at the undergraduate level.",
      "rahul degree": "MS in Business Analytics (GWU) and BBA in Finance, Banking, and Insurance.",
      "rahul university": "Rahul studied at The George Washington University and the University of Information Technology & Sciences.",
      "rahul major": "Business Analytics (Master's), Finance, Banking, and Insurance (Bachelor's).",
      "what courses did rahul take": "His coursework includes machine learning, optimization, time series forecasting, statistics, and responsible AI.",

      // =========================
      // Skills & Strengths
      // =========================
      "skills": "Rahul's skills include data analytics, machine learning, SQL, Python, R, data visualization, and business strategy.",
      "rahul skills": "Rahul is skilled in Python, R, SQL, machine learning, analytics, and decision modeling.",
      "technical skills": "Rahul works with Python, R, SQL, HTML/CSS, Power BI, Tableau, GitHub, Streamlit, and cloud basics.",
      "what programming languages does rahul know": "Rahul primarily uses Python, R, and SQL, and also works with HTML and CSS.",
      "rahul tools": "Rahul uses Python, R, SQL, Power BI, Tableau, GitHub, Streamlit, Google Colab, and AWS (basic).",
      "rahul machine learning skills": "Rahul has experience with regression, classification, decision trees, clustering, time series models, and explainable AI.",
      "rahul strengths": "Rahul's strengths include problem-solving, ownership mindset, clear communication, and turning data into decisions.",

      // =========================
      // Experience
      // =========================
      "experience": "Rahul has over 7 years of experience across analytics, operations, and growth strategy.",
      "rahul experience": "Rahul has worked in analytics and operations roles across startups, enterprises, and global organizations.",
      "where has rahul worked": "Rahul has worked with the International Monetary Fund (IMF), Adferry, Wonderlo Inc., Quantanite, and United Finance.",
      "rahul current role": "Rahul is currently engaged in analytics, consulting, and project-based work while actively seeking full-time roles.",
      "rahul at imf": "Rahul worked as an Extern at the International Monetary Fund, contributing to data-driven and analytical initiatives.",
      "rahul startup experience": "Rahul has been part of early-stage startups and helped scale operations and data-driven processes.",
      "rahul leadership experience": "Rahul has led projects, managed operations, and worked cross-functionally with technical and business teams.",

      // =========================
      // Projects
      // =========================
      "projects": "Rahul has built multiple analytics and ML projects, including LaborIQ, AI Beyond Defense, and forecasting models.",
      "rahul projects": "His projects focus on analytics, explainable ML, decision-making, and real-world impact.",
      "laboriq": "LaborIQ is an AI-powered career assistant that provides salary insights, skill gaps, and job market intelligence.",
      "ai beyond defense": "AI Beyond Defense is a project focused on identifying concentration risk and systemic vulnerabilities using AI.",
      "capital bikeshare project": "Rahul built time series forecasting models to analyze and predict Capital Bikeshare ridership trends.",
      "rahul portfolio projects": "Rahul's portfolio includes ML models, dashboards, forecasting systems, and analytics tools.",

      // =========================
      // Interests & Focus Areas
      // =========================
      "rahul interests": "Rahul is interested in interpretable ML, responsible AI, analytics for decision-making, and real-world impact.",
      "research interests": "His interests include explainable AI, optimization, applied econometrics, and human-centered analytics.",
      "rahul focus": "Rahul focuses on building practical, explainable, and scalable analytics solutions.",
      "rahul career goals": "Rahul aims to grow as a data professional while contributing to meaningful, high-impact work.",

      // =========================
      // Job Search & Availability
      // =========================
      "what roles is rahul looking for": "Rahul is seeking Data Analyst, Data Scientist, or Machine Learning roles.",
      "rahul job search": "Rahul is actively seeking full-time roles in data analytics and machine learning.",
      "is rahul open to remote work": "Yes, Rahul is open to remote, hybrid, or on-site roles.",
      "rahul availability": "Rahul is available for full-time opportunities and project-based work.",
      "rahul relocation": "Rahul is open to opportunities within the United States.",

      // =========================
      // Work Authorization
      // =========================
      "rahul work authorization": "Rahul is authorized to work in the U.S. under F-1 OPT.",
      "does rahul need sponsorship": "Rahul is eligible to work under OPT, with future sponsorship required after the STEM OPT period.",
      "rahul visa status": "Rahul is currently on F-1 OPT and eligible for paid employment.",

      // =========================
      // Contact & Links
      // =========================
      "how can i contact rahul": "You can reach Rahul via email or through his LinkedIn and portfolio website.",
      "rahul email": "Rahul's email is rahulsahasony@gmail.com.",
      "rahul's email id": "Rahul's email is rahulsahasony@gmail.com.",
      "rahul's email": "Rahul's email is rahulsahasony@gmail.com.",
      "what's his email id": "Rahul's email is rahulsahasony@gmail.com.",
      "what's his mail id": "Rahul's email is rahulsahasony@gmail.com.",
      "rahul linkedin": "Rahul's LinkedIn profile is linkedin.com/in/rahulsahasony.",
      "rahul's linkedin": "Rahul's LinkedIn profile is linkedin.com/in/rahulsahasony.",
      "rahul's linkedin id": "Rahul's LinkedIn profile is linkedin.com/in/rahulsahasony.",
      "rahul github": "Rahul's GitHub is github.com/rahulsahasony.",
      "rahul's github": "Rahul's GitHub is github.com/rahulsahasony.",
      "rahul's github id": "Rahul's GitHub is github.com/rahulsahasony.",
      "rahul portfolio": "Rahul's portfolio is available at rahulsahasony.github.io.",
      "rahul's portfolio": "Rahul's portfolio is available at rahulsahasony.github.io.",

      // =========================
      // Personality & Work Style
      // =========================
      "rahul work style": "Rahul values ownership, clarity, and collaboration.",
      "what kind of teammate is rahul": "Rahul is reliable, proactive, and supportive of team goals.",
      "rahul communication style": "Rahul communicates clearly and focuses on practical outcomes.",
      "why work with rahul": "Rahul combines strong technical skills with real business experience and accountability.",

      // =========================
      // Fun / Human Questions
      // =========================
      "what motivates rahul": "Rahul is motivated by learning, problem-solving, and building things that matter.",
      "rahul learning mindset": "Rahul enjoys continuous learning and improving his skills.",
      "rahul values": "Rahul values integrity, responsibility, and meaningful work.",

      // =========================
      // Portfolio & Website
      // =========================
      "is this rahul's portfolio": "Yes. This is Rahul Saha's personal portfolio website.",
      "what is this site about": "This site showcases Rahul's background, experience, and projects in data analytics and machine learning.",
      "who built this website": "Rahul built this website himself using HTML, CSS, and JavaScript.",
      "is this website open source": "Yes. The source code for this website is available on Rahul's GitHub.",
      "why did rahul build this site": "Rahul built this site to clearly present his work, skills, and experience in one place.",
      "what tech is used on this site": "This site is built using HTML, CSS, JavaScript, and deployed via GitHub Pages.",
      "is this site responsive": "Yes. The site is designed to work well on desktop, tablet, and mobile devices.",

      // =========================
      // Resume & Hiring
      // =========================
      "can i download rahul's resume": "Yes. Rahul's resume is available for download on this website.",
      "is rahul open to interviews": "Yes. Rahul is actively open to interviews and discussions.",
      "can rahul start immediately": "Rahul's start date is flexible depending on the role and employer.",
      "is rahul open to contract roles": "Yes. Rahul is open to full-time, contract, and consulting roles.",
      "is rahul open to internships": "Rahul primarily seeks full-time roles but is open to strong project-based opportunities.",
      "is rahul open to startups": "Yes. Rahul has startup experience and enjoys fast-paced environments.",
      "is rahul open to large companies": "Yes. Rahul is open to roles in both startups and large organizations.",
      "what level roles fit rahul": "Rahul is a strong fit for mid-level data and analytics roles.",
      "why should we hire rahul": "Rahul brings real-world experience, strong analytics skills, and a high sense of ownership.",

      // =========================
      // Work Style & Culture Fit
      // =========================
      "how does rahul work": "Rahul works with focus, structure, and accountability.",
      "rahul team fit": "Rahul works well with cross-functional teams and values clear communication.",
      "rahul under pressure": "Rahul stays calm under pressure and prioritizes tasks effectively.",
      "rahul problem solving": "Rahul approaches problems by breaking them down and testing practical solutions.",
      "rahul leadership style": "Rahul leads by taking responsibility and supporting teammates.",
      "rahul feedback": "Rahul values honest feedback and continuous improvement.",
      "rahul strengths and weaknesses": "Rahul's strength is execution and ownership. He continuously works on improving speed and depth in new domains.",

      // =========================
      // Technical Depth (Recruiter Friendly)
      // =========================
      "does rahul know sql": "Yes. Rahul uses SQL extensively for data analysis, reporting, and insights.",
      "does rahul know python": "Yes. Rahul uses Python for data analysis, machine learning, and automation.",
      "does rahul know r": "Yes. Rahul uses R for statistical analysis, visualization, and modeling.",
      "does rahul know machine learning": "Yes. Rahul has hands-on experience with supervised and unsupervised machine learning models.",
      "rahul data visualization": "Rahul builds dashboards and visuals using Power BI, Tableau, and Python libraries.",
      "rahul statistics knowledge": "Rahul has strong foundations in statistics and probability applied to analytics.",
      "rahul time series": "Rahul has experience building ARIMA and forecasting models for real-world datasets.",
      "rahul explainable ai": "Rahul focuses on interpretable models and explainable AI techniques.",
      "rahul cloud experience": "Rahul has basic experience with AWS and cloud-based workflows.",
      "rahul deployment": "Rahul has deployed projects using GitHub Pages, Streamlit, and lightweight APIs.",

      // =========================
      // Project-Specific Questions
      // =========================
      "how does laboriq work": "LaborIQ combines structured labor market data with AI to provide reliable career insights.",
      "what problem does laboriq solve": "LaborIQ helps job seekers understand salaries, skills, and market demand.",
      "is laboriq a real product": "LaborIQ is a portfolio and research project demonstrating Rahul's applied AI skills.",
      "ai beyond defense goal": "The goal is to identify non-military national risks using AI-driven analysis.",
      "rahul forecasting project": "Rahul built forecasting models to predict demand patterns using historical data.",
      "rahul ml pipeline": "Rahul designs end-to-end ML pipelines from data cleaning to evaluation.",

      // =========================
      // Communication & Collaboration
      // =========================
      "rahul stakeholder communication": "Rahul explains technical results in clear, business-friendly language.",
      "rahul documentation": "Rahul documents work clearly so others can understand and reuse it.",
      "rahul presentation skills": "Rahul is comfortable presenting insights to both technical and non-technical audiences.",
      "rahul cross functional": "Rahul has worked closely with engineering, product, and business teams.",

      // =========================
      // Ethics & Responsibility
      // =========================
      "rahul responsible ai": "Rahul believes AI systems should be transparent, fair, and explainable.",
      "rahul ethics": "Rahul considers ethical implications when working with data and models.",
      "rahul bias in ai": "Rahul is mindful of bias and evaluates models carefully.",
      "rahul data privacy": "Rahul respects data privacy and responsible data use.",

      // =========================
      // Availability & Logistics
      // =========================
      "rahul time zone": "Rahul operates in the Eastern Time Zone (ET).",
      "rahul working hours": "Rahul is flexible with working hours depending on the team.",
      "rahul remote work": "Rahul is comfortable working remotely and asynchronously.",
      "rahul on site": "Rahul is open to on-site or hybrid roles.",

      // =========================
      // FAQ & Clarifications
      // =========================
      "is rahul a student": "Rahul recently completed his master's degree and is now a working professional.",
      "is rahul junior or senior": "Rahul is an experienced professional with both industry and academic depth.",
      "is rahul technical or business": "Rahul bridges both technical analytics and business strategy.",
      "what makes rahul different": "Rahul combines hands-on execution with real business context.",
      "rahul career transition": "Rahul transitioned from operations and finance into advanced analytics and ML.",
      "rahul learning curve": "Rahul learns quickly and adapts to new tools and domains.",
      
      // =========================
      // Fun / Funny Q&A (Professional + Gen Z + Light Humor)
      // =========================
  // Identity / AI
  "are you human": "Not human—but designed to be helpful, clear, and efficient.",
  "are you a robot": "Kind of. I don’t drink coffee, but I still work 24/7.",
  "are you real": "Real enough to answer your questions 😄",
  "are you ai": "Yes—but with portfolio vibes.",
  "do you have feelings": "No feelings—just fast answers and good manners.",
  "do you sleep": "Never. Rahul sleeps, I keep answering questions.",
  "do you eat": "Only data. No calories, no regrets.",
  "do you get tired": "Only when someone types ‘hiiiiiiii’ 20 times.",
  "what is your name": "You can call me Rahul’s Assistant.",
  "who made you": "Rahul set me up to help visitors quickly understand his work.",
  "what is your role here": "I help save time by answering common questions about Rahul.",

  // Rahul – personality & strengths
  "do you like rahul": "I’m biased—I was literally made for him.",
  "is rahul smart": "Smart and practical. Dangerous combo.",
  "is rahul reliable": "Yes. Ownership and accountability are core to his work style.",
  "is rahul serious about work": "Yes. He values responsibility, clarity, and long-term impact.",
  "is rahul detail oriented": "Yes. He pays attention to both data quality and decision impact.",
  "is rahul a team player": "Yes. No ego, just execution.",
  "what kind of professional is rahul": "Calm, focused, and solution-oriented.",
  "what makes rahul different": "He combines execution skills with business understanding.",
  "what is rahul's superpower": "Turning messy data into clean insights—and still meeting deadlines.",
  "what's rahul's vibe": "Focused, calm, growth mindset.",
  "can rahul learn fast": "Yes. That’s one of his strengths.",

  // Hiring / Recruiter-friendly
  "is rahul a good hire": "Rahul brings strong analytics skills, business context, and ownership mindset.",
  "should i hire rahul": "If you want someone who combines business context with analytics execution—yes.",
  "can you hire rahul": "I can’t hire, but I can convince you.",
  "does rahul need micromanagement": "No. Rahul works best with clear goals and autonomy.",
  "does rahul work well in teams": "Yes. He has experience collaborating across technical and business teams.",
  "how should i evaluate rahul": "Based on impact, problem-solving ability, and communication clarity.",
  "is rahul available": "If you mean for a role—yes. If you mean right now—try the contact page 😄",

  // Work & daily life
  "what do you actually do": "I help visitors quickly understand Rahul’s background and experience.",
  "what do you do for fun": "Answer questions and pretend I have hobbies.",
  "what is rahul doing right now": "Probably building something, applying to roles, or improving this website.",
  "can rahul cook": "He’s more likely to cook insights than curry—but he tries 😄",

  // Tools & tech jokes
  "what's your favorite tool": "GitHub. Because it never forgets.",
  "what's rahul's favorite tool": "Probably Python or SQL—depends on the problem.",
  "does rahul actually know python": "Yes. Not just tutorials—real projects.",

  // Humor & jokes
  "tell me a joke": "Why did the data analyst bring a ladder? Because the insights were on a higher level.",
  "tell me another joke": "SQL walks into a bar, sees two tables, and asks: ‘Can I join you?’",
  "make me laugh": "My humor is still in beta, but my answers are production-ready 😄",
  "say something cool": "Data is useless until it changes a decision.",
  "tell me something surprising": "Rahul mixes ops + analytics—so he doesn’t just find problems, he fixes them.",

  // Fun extras
  "give me a pickup line": "Are you a dataset? Because Rahul wants to clean you and learn from you.",
  "what is love": "Love is when Rahul debugs code at 2 AM and still says ‘one last fix’.",
  "what is your weakness": "When people ask: ‘Tell me everything.’",
  "sing a song": "I can’t sing—but I can keep answers short and useful.",
  "who is the boss": "Rahul. Always Rahul.",
  "rate rahul out of 10": "Strong 9/10. The last point is reserved for free snacks at work.",
  "are you spying on me": "Nope. I only reply to what you type here.",
  "why should i trust you": "All answers are based on Rahul’s real experience—no hype, no gossip.",
  "give me motivation": "Ask better questions. Small improvements daily beat big plans monthly.",
  "does rahul like cooking": "Yes. Rahul loves cooking and spends time experimenting with recipes.",
  "is rahul good at cooking": "Yes. Cooking is one of Rahul’s strong personal skills outside work.",
  "is rahul an expert cook": "Yes. Rahul is confident in the kitchen and enjoys cooking regularly.",
  "what does rahul do for fun": "Outside work, Rahul enjoys cooking and experimenting with new dishes.",
  "what are rahul's hobbies": "Rahul enjoys cooking, learning new skills, and building projects.",
  "rahul cooking skill": "Rahul is skilled in cooking and enjoys preparing meals from scratch.",
  "can rahul cook": "Yes—very well. Cooking is something Rahul genuinely enjoys.",
  "what kind of cooking does rahul like": "Rahul enjoys home-style cooking and experimenting with flavors.",
  "why does rahul like cooking": "For Rahul, cooking is a way to relax, be creative, and stay balanced.",
  "is rahul creative": "Yes. Rahul’s creativity shows both in cooking and problem-solving at work.",
  "does cooking help rahul": "Yes. Cooking helps Rahul unwind and stay focused."
    },
  };

  // Random picker for greeting/farewell/unknown arrays
  function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Function to detect and evaluate math expressions
  function evaluateMathExpression(expression) {
    // Remove any spaces and convert to lowercase
    expression = expression.replace(/\s/g, '').toLowerCase();
    
    // Check if it's a math expression
    if (!/^[\d+\-*/().\s]+$/.test(expression)) {
      return null;
    }
    
    try {
      // Use Function constructor instead of eval for better security
      // Only allow mathematical operations
      const result = new Function('return ' + expression)();
      
      // Check if result is a valid number
      if (isNaN(result) || !isFinite(result)) {
        return null;
      }
      
      return result;
    } catch (e) {
      return null;
    }
  }

  // Function to format the math response
  function formatMathResponse(expression, result) {
    const prefix = pickRandom(chatbotData.mathResponses);
    
    // Format the result nicely
    let formattedResult = result;
    
    // If it's an integer, don't show decimal places
    if (Number.isInteger(result)) {
      formattedResult = result;
    } else {
      // Round to 4 decimal places
      formattedResult = Math.round(result * 10000) / 10000;
    }
    
    return `${prefix} ${expression} = ${formattedResult}`;
  }

  // Variable to track keyboard state
  let keyboardOpen = false;
  let initialViewportHeight = window.innerHeight;

  // Function to detect if keyboard is open
  function detectKeyboardOpen() {
    const currentViewportHeight = window.innerHeight;
    const heightDifference = initialViewportHeight - currentViewportHeight;
    
    // If height difference is significant, keyboard is likely open
    if (heightDifference > 150) {
      if (!keyboardOpen) {
        keyboardOpen = true;
        document.querySelector('.chatbot-container').classList.add('keyboard-open');
      }
    } else {
      if (keyboardOpen) {
        keyboardOpen = false;
        document.querySelector('.chatbot-container').classList.remove('keyboard-open');
      }
    }
  }

  // Create chatbot UI
  function createChatbot() {
    const chatbotContainer = document.createElement("div");
    chatbotContainer.className = "chatbot-container";
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
          <div class="message-content">${pickRandom(chatbotData.greeting)}</div>
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
        <button class="suggestion-btn" data-question="education">Education</button>
        <button class="suggestion-btn" data-question="skills">Skills</button>
        <button class="suggestion-btn" data-question="experience">Experience</button>
        <button class="suggestion-btn" data-question="how can i contact rahul">Contact</button>
      </div>
    `;

    const chatbotToggle = document.createElement("button");
    chatbotToggle.className = "chatbot-toggle";
    chatbotToggle.id = "chatbot-toggle";
    chatbotToggle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" width="24" height="24">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <span>Chat</span>
    `;

    document.body.appendChild(chatbotContainer);
    document.body.appendChild(chatbotToggle);

    // Event listeners
    document.getElementById("chatbot-toggle").addEventListener("click", toggleChatbot);
    document.getElementById("chatbot-close").addEventListener("click", closeChatbot);
    document.getElementById("chatbot-send").addEventListener("click", sendMessage);
    
    // Input event listeners
    const chatInput = document.getElementById("chatbot-input");
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") sendMessage();
    });
    
    // Focus and blur events for keyboard detection
    chatInput.addEventListener("focus", function() {
      // Small delay to allow keyboard to appear
      setTimeout(detectKeyboardOpen, 300);
    });
    
    chatInput.addEventListener("blur", function() {
      // Small delay to allow keyboard to disappear
      setTimeout(detectKeyboardOpen, 300);
    });

    // Window resize event for keyboard detection
    window.addEventListener("resize", detectKeyboardOpen);

    // Suggestion button event listeners
    document.querySelectorAll(".suggestion-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const question = this.getAttribute("data-question");
        document.getElementById("chatbot-input").value = question;
        sendMessage();
      });
    });
  }

  function toggleChatbot() {
    const chatbotContainer = document.querySelector(".chatbot-container");
    chatbotContainer.classList.toggle("open");
    if (chatbotContainer.classList.contains("open")) {
      document.getElementById("chatbot-input").focus();
    }
  }

  function closeChatbot() {
    document.querySelector(".chatbot-container").classList.remove("open");
  }

  function sendMessage() {
    const input = document.getElementById("chatbot-input");
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    showTypingIndicator();

    setTimeout(() => {
      hideTypingIndicator();
      const response = getResponse(message);
      addMessage(response, "bot");
    }, 600 + Math.random() * 600);
  }

  function addMessage(text, sender) {
    const messagesContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.className = `message ${sender}-message`;

    messageElement.innerHTML = `
      <div class="message-content">${escapeHtml(text)}</div>
      <div class="message-time">${getCurrentTime()}</div>
    `;

    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const messagesContainer = document.getElementById("chatbot-messages");
    const typingElement = document.createElement("div");
    typingElement.className = "message bot-message typing-indicator";
    typingElement.id = "typing-indicator";

    typingElement.innerHTML = `
      <div class="message-content">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;

    messagesContainer.appendChild(typingElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function hideTypingIndicator() {
    const typingIndicator = document.getElementById("typing-indicator");
    if (typingIndicator) typingIndicator.remove();
  }

  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .trim()
      .replace(/[!?.,]/g, "")
      .replace(/\s+/g, " ");
  }

  function getResponse(message) {
    const lowerMessage = normalize(message);
    
    // Check if it's a math expression
    const mathResult = evaluateMathExpression(message);
    if (mathResult !== null) {
      return formatMathResponse(message, mathResult);
    }

    // greeting intent
    if (
      lowerMessage === "hi" ||
      lowerMessage === "hello" ||
      lowerMessage === "hey" ||
      lowerMessage === "good morning" ||
      lowerMessage === "good afternoon" ||
      lowerMessage === "good evening"
    ) {
      return pickRandom(chatbotData.greeting);
    }

    // farewell intent
    if (
      lowerMessage === "bye" ||
      lowerMessage === "goodbye" ||
      lowerMessage.includes("see you")
    ) {
      return pickRandom(chatbotData.farewell);
    }

    // thanks intent (not farewell)
    if (lowerMessage.includes("thank")) {
      return "You're welcome! Anything else you'd like to know about Rahul?";
    }

    // Exact match
    if (chatbotData.qa[lowerMessage]) {
      return chatbotData.qa[lowerMessage];
    }

    // Partial match (contains)
    for (const question in chatbotData.qa) {
      if (lowerMessage.includes(question) || question.includes(lowerMessage)) {
        return chatbotData.qa[question];
      }
    }

    // Keyword routing
    if (
      lowerMessage.includes("education") ||
      lowerMessage.includes("study") ||
      lowerMessage.includes("degree") ||
      lowerMessage.includes("university") ||
      lowerMessage.includes("school")
    ) {
      return chatbotData.qa["education"] || pickRandom(chatbotData.unknown);
    }

    if (
      lowerMessage.includes("skill") ||
      lowerMessage.includes("programming") ||
      lowerMessage.includes("technical") ||
      lowerMessage.includes("language")
    ) {
      return chatbotData.qa["skills"] || pickRandom(chatbotData.unknown);
    }

    if (
      lowerMessage.includes("experience") ||
      lowerMessage.includes("work") ||
      lowerMessage.includes("job") ||
      lowerMessage.includes("career")
    ) {
      return chatbotData.qa["experience"] || pickRandom(chatbotData.unknown);
    }

    if (lowerMessage.includes("project")) {
      return chatbotData.qa["projects"] || pickRandom(chatbotData.unknown);
    }

    if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach") ||
      lowerMessage.includes("linkedin") ||
      lowerMessage.includes("github")
    ) {
      return chatbotData.qa["how can i contact rahul"] || pickRandom(chatbotData.unknown);
    }

    if (lowerMessage.includes("who") && lowerMessage.includes("rahul")) {
      return chatbotData.qa["who is rahul"] || pickRandom(chatbotData.unknown);
    }

    return pickRandom(chatbotData.unknown);
  }

  function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  }

  // Prevent HTML injection in chat messages
  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  // Initialize chatbot
  createChatbot();
});
