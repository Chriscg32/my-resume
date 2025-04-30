
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
    name: "Frontend",
    skills: [
      { name: "React", level: 5 },
      { name: "HTML/CSS", level: 5 },
      { name: "JavaScript", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Next.js", level: 4 },
      { name: "Tailwind CSS", level: 4 },
    ]
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 4 },
      { name: "Express", level: 4 },
      { name: "Python", level: 3 },
      { name: "MongoDB", level: 4 },
      { name: "PostgreSQL", level: 3 },
      { name: "RESTful APIs", level: 5 },
    ]
  },
  {
    name: "Tools & Others",
    skills: [
      { name: "Git", level: 5 },
      { name: "Docker", level: 3 },
      { name: "AWS", level: 3 },
      { name: "CI/CD", level: 4 },
      { name: "Agile/Scrum", level: 4 },
      { name: "Testing", level: 4 },
    ]
  }
];
