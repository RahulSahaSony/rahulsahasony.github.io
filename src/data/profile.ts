export type LinkItem = { label: string; href: string };
export type Project = {
  title: string;
  description: string;
  impact: string; // keep short, measurable if possible
  tags: string[];
  github?: string;
  demo?: string;
};

export type ExperienceRole = {
  title: string;
  company: string;
  dates: string;
  location: string;
  bullets: string[];
};

export type EducationItem = {
  degree: string;
  school: string;
  year: string;
  gpa?: string;
};

export type SkillsGroup = {
  group: "Languages & Analytics" | "ML & Data Science" | "Tools & Platforms" | "Business & Strategy";
  items: string[];
};

export const profile = {
  initials: "RS", // (Edit me)
  name: "(Edit me) Your Name",
  headline: "Business Analytics | Data Science | ML & Growth (Edit me)",
  subheadline:
    "(Edit me) One-sentence value proposition. Example: I build data-driven systems that improve growth, operations, and decision-making.",
  now: "(Edit me) Currently focusing on: job search + portfolio rebuild + shipping projects.",
  links: {
    resume: "/resume",
    linkedin: "(Edit me) https://linkedin.com/in/your-handle",
    github: "(Edit me) https://github.com/your-username",
    email: "mailto:(Edit me) you@example.com"
  },
  featuredProjects: [
    {
      title: "(Edit me) Project One",
      description: "(Edit me) 1–2 line description.",
      impact: "(Edit me) Example: Reduced manual reporting time by 40%.",
      tags: ["React", "TypeScript", "Tailwind"],
      github: "(Edit me) https://github.com/your-username/project-one",
      demo: "(Edit me) https://example.com"
    },
    {
      title: "(Edit me) Project Two",
      description: "(Edit me) 1–2 line description.",
      impact: "(Edit me) Example: Improved conversion tracking accuracy.",
      tags: ["Python", "SQL", "Analytics"],
      github: "(Edit me) https://github.com/your-username/project-two"
    },
    {
      title: "(Edit me) Project Three",
      description: "(Edit me) 1–2 line description.",
      impact: "(Edit me) Example: Built KPI dashboard for leadership.",
      tags: ["Dashboards", "ETL", "Visualization"],
      github: "(Edit me) https://github.com/your-username/project-three"
    }
  ] as Project[],
  allProjects: [
    // Include featured + more
    // (Edit me) Replace with your CV projects
  ] as Project[],
  skills: [
    {
      group: "Languages & Analytics",
      items: ["Python (Edit me)", "SQL (Edit me)", "R (Edit me)", "Excel/Sheets (Edit me)"]
    },
    {
      group: "ML & Data Science",
      items: ["(Edit me) Regression", "(Edit me) Classification", "(Edit me) Time Series", "(Edit me) Model Evaluation"]
    },
    {
      group: "Tools & Platforms",
      items: ["Git (Edit me)", "GitHub Actions (Edit me)", "AWS (basic) (Edit me)", "Docker (Edit me)"]
    },
    {
      group: "Business & Strategy",
      items: ["(Edit me) Growth Analytics", "(Edit me) Programmatic Advertising", "(Edit me) Stakeholder Management", "(Edit me) Experimentation"]
    }
  ] as SkillsGroup[],
  about: [
    "(Edit me) Short paragraph 1 based on your CV.",
    "(Edit me) Short paragraph 2.",
    "(Edit me) Optional paragraph 3."
  ],
  experience: [
    {
      title: "(Edit me) Role Title",
      company: "(Edit me) Company Name",
      dates: "(Edit me) Month YYYY – Month YYYY",
      location: "(Edit me) City, State",
      bullets: [
        "(Edit me) Achievement bullet with action + outcome.",
        "(Edit me) Achievement bullet.",
        "(Edit me) Achievement bullet.",
        "(Edit me) Achievement bullet."
      ]
    }
  ] as ExperienceRole[],
  education: [
    {
      degree: "(Edit me) MS in Business Analytics",
      school: "(Edit me) University",
      year: "(Edit me) YYYY",
      gpa: "(Edit me) 3.xx/4.0"
    }
  ] as EducationItem[],
  resumePage: {
    bestLine: "(Edit me) Best one-line summary for the resume header.",
    locationLine: "(Edit me) City, State • (Edit me) email • (Edit me) LinkedIn • (Edit me) GitHub"
  },
  contact: {
    intro: "(Edit me) I’m open to roles and collaborations. Reach out anytime.",
    bestWay: "(Edit me) Best way to reach me: email with a short note + the role/link.",
    cards: [
      { label: "Email", value: "(Edit me) you@example.com", href: "mailto:(Edit me)you@example.com" },
      { label: "LinkedIn", value: "(Edit me) /in/your-handle", href: "(Edit me) https://linkedin.com/in/your-handle" },
      { label: "GitHub", value: "(Edit me) /your-username", href: "(Edit me) https://github.com/your-username" },
      { label: "Location", value: "(Edit me) Your City, Country", href: "" }
    ]
  }
} as const;
