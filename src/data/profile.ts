// src/data/profile.ts
export interface Project {
  id: string;
  title: string;
  description: string;
  impact: string;
  tech: string[];
  githubUrl?: string;
  demoUrl?: string;
  period: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  period: string;
  coursework?: string[];
}

export interface SkillGroup {
  title: string;
  skills: string[];
}

export const profile = {
  name: "Rahul Saha",
  initials: "RS",
  headline: "Business Analytics | Data Science | ML & Growth",
  subheadline: "Passionate about leveraging data to drive business decisions and create impactful solutions.",
  now: "Currently pursuing MS in Business Analytics at The George Washington University while working on AI and ML projects.",
  links: {
    resume: "/resume.pdf",
    linkedin: "https://linkedin.com/in/rahulsahasony",
    github: "https://github.com/rahulsahasony",
    email: "rahulsahasony@gmail.com",
  },
  featuredProjects: [
    {
      id: "1",
      title: "LaborIQ: An Intelligent Career Assistant",
      description: "Built a dual-model architecture combining SQL-based market insights and RAG-based LLM pipeline to deliver verified salary benchmarks and career insights.",
      impact: "Identified job-seeker pain points through user survey (n=31) to inform feature prioritization",
      tech: ["Python", "SQL", "RAG", "LLM", "Streamlit"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Sep 2025 - Dec 2025"
    },
    {
      id: "2",
      title: "AI Beyond Defense: Tackling Concentration Risk",
      description: "Built a multimodal AI tool using OpenAI's APIs to help U.S. policymakers identify and mitigate non-military national security threats.",
      impact: "Identified single-source risks for critical materials like semiconductors with clear visualizations",
      tech: ["OpenAI API", "Streamlit", "Python"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Jun 2025"
    },
    {
      id: "3",
      title: "Explainable ML for High-Priced Mortgage Prediction",
      description: "Built explainable models to predict high-priced mortgage loans while reducing demographic bias using HMDA data (180K+ records).",
      impact: "Final model achieved AUC of 0.83 and improved fairness across race and gender",
      tech: ["Python", "EBM", "GLM", "HMDA"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Apr 2025 - May 2025"
    }
  ],
  allProjects: [
    {
      id: "1",
      title: "LaborIQ: An Intelligent Career Assistant",
      description: "Built a dual-model architecture combining a SQL-based market-insights engine and a RAG-based LLM pipeline to deliver verified salary benchmarks, skill gaps, and career insights.",
      impact: "Identified job-seeker pain points through user survey (n=31) to inform feature prioritization",
      tech: ["Python", "SQL", "RAG", "LLM", "Streamlit"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Sep 2025 - Dec 2025"
    },
    {
      id: "2",
      title: "AI Beyond Defense: Tackling Concentration Risk",
      description: "Built a multimodal AI tool (SupplyGuard) using OpenAI's APIs to help U.S. policymakers identify and mitigate non-military national security threats, such as concentration risk and misinformation.",
      impact: "Identified single-source risks for critical materials like semiconductors, with clear visualizations",
      tech: ["OpenAI API", "Streamlit", "Python"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Jun 2025"
    },
    {
      id: "3",
      title: "Forecasting Monthly Ridership for Capital Bikeshare",
      description: "Conducted time series forecasting on Capital Bikeshare's monthly ridership data to support demand planning and resource optimization.",
      impact: "Evaluated and compared multiple forecasting models to select optimal model based on performance metrics",
      tech: ["R", "Time Series", "ARIMA", "Holt-Winters"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Mar 2025 - May 2025"
    },
    {
      id: "4",
      title: "Explainable ML for High-Priced Mortgage Prediction",
      description: "Built explainable models (EBM, GLM) to predict high-priced mortgage loans while reducing demographic bias using HMDA data (180K+ records).",
      impact: "Final model (EBM) achieved AUC of 0.83 and improved fairness across race and gender",
      tech: ["Python", "EBM", "GLM", "HMDA"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Apr 2025 - May 2025"
    },
    {
      id: "5",
      title: "Dimensional Modeling and Analysis of the NBA Shots Dataset",
      description: "Simulated the analytics department of the Golden State Warriors to identify player performance trends and improvement areas.",
      impact: "Identified the top 5 players to retain and the bottom 5 to replace based on performance analysis",
      tech: ["SQL", "PostgreSQL", "Python", "JupyterLab"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Nov 2024 - Dec 2024"
    },
    {
      id: "6",
      title: "Decision Modeling for Recreational Land Investment Strategy",
      description: "Modeled an investment decision for a $10M recreational property using decision trees and sensitivity analysis to evaluate lease approvals, legal risks, and option extensions.",
      impact: "Recommended a $400K budget and optimal IPO date, improving decision confidence by 15%",
      tech: ["Decision Trees", "Monte Carlo Simulation", "@Risk"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Oct 2024 - Dec 2024"
    },
    {
      id: "7",
      title: "Harnessing Sentiment Analysis for Mental Health Support",
      description: "Explored the use of AI-powered sentiment analysis to detect early signs of anxiety, depression, and PTSD.",
      impact: "Built and evaluated models including BERT (92% accuracy) and LSTM (89%) for sentiment classification",
      tech: ["BERT", "LSTM", "CNN-LSTM", "Python"],
      githubUrl: "https://github.com/rahulsahasony",
      period: "Sep 2024 - Dec 2024"
    }
  ],
  skillGroups: [
    {
      title: "Languages & Analytics",
      skills: ["R", "Python", "SQL"]
    },
    {
      title: "ML & Data Science",
      skills: ["Linear Regression", "Logistic Regression", "Decision Trees", "SVM", "KNN", "BERT", "LSTM"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Power BI", "Tableau", "Matplotlib", "Excel (Advanced)", "Google Sheets", "PowerPoint", "Microsoft 365", "Google Workspace", "AWS (basic)", "GitHub", "Grafana", "QuickBooks", "Canva", "Figma"]
    },
    {
      title: "Business & Strategy",
      skills: ["Business Analytics", "Decision Models", "Optimization", "Time Series Forecasting", "Stochastic Models", "Text Analytics", "Visualization"]
    }
  ],
  experience: [
    {
      id: "1",
      title: "Extern – Secretary's Department",
      company: "International Monetary Fund (IMF)",
      location: "Washington, DC",
      period: "Aug 2025 - Nov 2025",
      achievements: [
        "Assisted budget officer with expense tracking, compliance documentation, and real-time monitoring of event expenditures for a $3M project.",
        "Supported planning and execution of the WB IMF annual meetings, and cross-department workflows.",
        "Liaised with internal teams and external stakeholders, including member country officials, to ensure smooth communication.",
        "Analyzed budget data and presented trends using Power BI."
      ]
    },
    {
      id: "2",
      title: "Build Student Consultant – Deploying AI Into Small Businesses",
      company: "Build Fellowship by Open Avenues",
      location: "Washington, DC",
      period: "Jul 2025 - Sep 2025",
      achievements: [
        "Analyzed small business workflows to identify inefficiencies and opportunities for automation.",
        "Designed AI-powered solutions to improve customer engagement and operational efficiency.",
        "Developed an ethical AI deployment framework addressing transparency, bias, and privacy concerns.",
        "Presented an actionable deployment strategy tailored to real-world small business use cases."
      ]
    },
    {
      id: "3",
      title: "Founding Team – Growth & Strategy Lead",
      company: "Adferry",
      location: "Middletown, DE",
      period: "Jul 2023 - Jul 2024",
      achievements: [
        "Served as a founding team member, helping shape Adferry's strategic direction, operational structure, and growth engine from the ground up.",
        "Led cross-functional initiatives spanning ad operations (mostly on CTV and In-app), growth strategy, marketing, HR, finance, and internal systems.",
        "Built and launched Adferry's official website and brand identity, including logo and all visual assets.",
        "Oversaw onboarding and training of 13+ team members across departments; managed HR documentation and contracts.",
        "Collaborated with the finance team to streamline collections and revenue tracking systems for enhanced transparency.",
        "Monitored programmatic ad campaigns across DSPs and SSPs, driving a 25% increase in revenue through real-time optimizations and reporting."
      ]
    },
    {
      id: "4",
      title: "Operations Manager",
      company: "Wonderlo Inc.",
      location: "Wilmington, DE",
      period: "Oct 2020 - Jul 2023",
      achievements: [
        "Worked closely with the tech team to help build Wonderlo's ad server, improving how ads were delivered and tracked.",
        "Achieved a 4x increase in overall company revenue through effective inventory monetization and strategic partner onboarding.",
        "Oversaw daily ad operations and campaign performance across 50+ partners, improving delivery rates by 20% and optimizing profitability through floor price adjustments.",
        "Managed relationships with SSPs, affiliates, ad networks, and media buyers, negotiating CPC/CPM-based deals to expand market reach and ROI.",
        "Built and maintained interactive dashboards for real-time performance tracking and reporting, enhancing decision-making for both internal and external stakeholders.",
        "Scaled programmatic revenue from $500/day to $3,000/day by managing real-time bidding (RTB) campaigns across SmartHub, PLL, and AppNexus exchanges."
      ]
    },
    {
      id: "5",
      title: "Senior Analyst",
      company: "Quantanite (formerly Taskeater)",
      location: "Dhaka, Bangladesh",
      period: "Aug 2018 - Aug 2020",
      achievements: [
        "Worked in the data processing team, handling tasks like content moderation, data entry, and data mining based on client needs.",
        "Used tools like Google Sheets and CRM systems to manage and organize data efficiently.",
        "Completed various online back-office tasks, always following client instructions closely.",
        "Raised any task-related issues with supervisors to prevent delays or errors.",
        "Shared progress and insights with the team during regular meetings and presentations."
      ]
    },
    {
      id: "6",
      title: "Deposit Associate",
      company: "United Finance",
      location: "Chattogram, Bangladesh",
      period: "Dec 2015 - Mar 2016",
      achievements: [
        "Helped clients open new deposit accounts and collect investments for fixed-return financial products.",
        "Maintained regular contact with clients to support strong relationships and consistent service.",
        "Executed direct marketing initiatives under the general supervision of the Investment Marketing Department.",
        "Helped to maintain accurate customer records and update data in core banking systems."
      ]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Science in Business Analytics",
      school: "The George Washington University",
      period: "Aug 2024 - Dec 2025",
      coursework: [
        "Programming for Analytics",
        "Data Management",
        "Decision Models",
        "Stochastic Foundation: Probability Models",
        "Machine Learning",
        "Statistics for Analytics",
        "Time Series Forecasting",
        "Responsible Machine Learning",
        "Optimization",
        "Foundations of AI",
        "Visualization for Analytics",
        "Text Analytics",
        "Business Analytics Practicum"
      ]
    },
    {
      id: "2",
      degree: "Bachelor of Business Administration in Finance, Banking, and Insurance",
      school: "University of Information Technology & Sciences",
      period: "Aug 2011 - Dec 2016",
      coursework: [
        "Research Methodology for Business",
        "Financial Management",
        "Corporate Finance",
        "Investment Management",
        "Security Analysis",
        "Portfolio Management",
        "International Trade and Finance",
        "Business Statistics",
        "Management Information Systems",
        "Operations Management",
        "Leadership",
        "Professional Ethics"
      ]
    }
  ],
  contact: {
    email: "rahulsahasony@gmail.com",
    phone: "(240) 467-7141",
    location: "Falls Church, VA 22041, United States",
    linkedin: "https://linkedin.com/in/rahulsahasony",
    github: "https://github.com/rahulsahasony",
    bestWayToReach: "Email is the best way to reach me. I typically respond within 24 hours."
  }
};
