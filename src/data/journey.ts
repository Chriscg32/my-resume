
export interface Milestone {
  date: string;
  title: string;
  description: string;
  achievements: string[];
}

export const journeyData: Milestone[] = [
  {
    date: "Month 1",
    title: "First Steps into AI Automation",
    description: "Began exploring AI tools and their potential impact on technical workflows",
    achievements: [
      "Started learning about prompt engineering fundamentals",
      "Experimented with AI-assisted coding with GitHub Copilot",
      "Created first Lovable project to understand web development",
      "Explored basic Docker concepts for containerization"
    ]
  },
  {
    date: "Month 2",
    title: "Automation Platforms & Workflows",
    description: "Focused on practical automation tools and workflow integration",
    achievements: [
      "Successfully set up and configured n8n locally with Docker",
      "Created first automation workflows connecting multiple services",
      "Learned about agent-to-agent protocols for AI systems",
      "Developed document automation solutions with PDFify"
    ]
  },
  {
    date: "Month 3",
    title: "Technical Skills Expansion",
    description: "Broadened technical foundation through hands-on practice",
    achievements: [
      "Started learning Python basics for technical diagnostics",
      "Built first functioning GitHub repositories and managed version control",
      "Explored VS Code extensions and AI-enhanced IDE tools like Cody",
      "Joined the NetworkChuck Academy for network security foundations"
    ]
  },
  {
    date: "Month 4",
    title: "Advanced AI Integration",
    description: "Leveraging AI tools for more complex technical solutions",
    achievements: [
      "Experimented with locally hosted LM Studio for AI model deployment",
      "Implemented RAG (Retrieval Augmented Generation) concepts for knowledge bases",
      "Started exploring MCP (Message Coupling Protocol) for agent communication",
      "Designed Niche Finder Pro for automated market research"
    ]
  }
];
