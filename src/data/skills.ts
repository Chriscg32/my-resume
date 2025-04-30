
export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  level: number; // 1-5 scale
}

export const skillCategories: SkillCategory[] = [
  {
    name: "AI & Automation",
    skills: [
      { name: "AI Prompt Engineering", level: 4 },
      { name: "n8n Workflows", level: 3 },
      { name: "LLM Integration", level: 3 },
      { name: "AI-Assisted Coding", level: 4 },
      { name: "RAG Systems", level: 2 },
      { name: "Vector Databases", level: 2 },
    ]
  },
  {
    name: "Development",
    skills: [
      { name: "HTML/CSS", level: 3 },
      { name: "JavaScript/TypeScript", level: 3 },
      { name: "React", level: 3 },
      { name: "Python Basics", level: 2 },
      { name: "Git/GitHub", level: 3 },
      { name: "Docker", level: 2 },
    ]
  },
  {
    name: "Technical Systems",
    skills: [
      { name: "Security Systems", level: 5 },
      { name: "Technical Troubleshooting", level: 5 },
      { name: "System Configuration", level: 4 },
      { name: "Project Management", level: 4 },
      { name: "Cloud Services", level: 3 },
      { name: "Workflow Optimization", level: 4 },
    ]
  }
];
