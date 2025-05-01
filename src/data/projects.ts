
export type ProjectType = 'lovable' | 'github';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  previewImage?: string; // New field for website preview screenshots
  demoUrl: string;
  webPreviewUrl?: string; // Optional field for in-progress projects with web previews
  githubUrl: string;
  technologies: string[];
  type: ProjectType;
  status: 'completed' | 'in-progress';
}

export const projects: Project[] = [
  {
    id: "1",
    title: "Niche Finder Pro",
    description: "AI-powered market research tool that identifies profitable niches and analyzes competition to find opportunities.",
    image: "/lovable-uploads/niche-finder.png",
    previewImage: "/lovable-uploads/niche-finder-preview.png",
    demoUrl: "https://preview-2ca659b1--niche-finder-pro-launch.lovable.app/",
    webPreviewUrl: "https://preview-2ca659b1--niche-finder-pro-launch.lovable.app/",
    githubUrl: "https://github.com/chrisgates32/NicheAuto",
    technologies: ["TypeScript", "React", "AI Integration", "Market Analysis"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "2",
    title: "Automastery n8n Knight",
    description: "Workflow automation project exploring n8n capabilities with Docker deployment and AI-driven workflows.",
    image: "/lovable-uploads/automastery.png",
    previewImage: "/lovable-uploads/automastery-preview.png",
    demoUrl: "https://preview--automastery-n8n-knight.lovable.app/",
    webPreviewUrl: "https://preview--automastery-n8n-knight.lovable.app/",
    githubUrl: "https://github.com/chrisgates32/automastery-n8n-knight",
    technologies: ["n8n", "Docker", "Workflow Automation", "API Integration"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "3",
    title: "LeadSpark AI",
    description: "Lead generation system that uses AI to qualify prospects and automate initial outreach communications.",
    image: "/lovable-uploads/leadspark.png",
    previewImage: "/lovable-uploads/leadspark-preview.png",
    demoUrl: "https://preview-bdce6f6c--leadspark-ai-ignite.lovable.app/",
    webPreviewUrl: "https://preview-bdce6f6c--leadspark-ai-ignite.lovable.app/",
    githubUrl: "https://github.com/chrisgates32/lead-spark",
    technologies: ["AI", "React", "TypeScript", "CRM Integration"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "4",
    title: "FUMA Legacy Chronicles",
    description: "Interactive gaming platform showcasing historical football manager legends with immersive storytelling.",
    image: "/lovable-uploads/merchfusion.png",
    previewImage: "/lovable-uploads/fuma-preview.png",
    demoUrl: "https://preview-aa167eac--fuma-legacy-chronicles.lovable.app/",
    webPreviewUrl: "https://preview-aa167eac--fuma-legacy-chronicles.lovable.app/",
    githubUrl: "https://github.com/chrisgates32/fuma-legacy",
    technologies: ["React", "TypeScript", "Gaming", "Interactive Content"],
    type: "lovable",
    status: "completed"
  },
  {
    id: "5",
    title: "n8n Workflows",
    description: "Contributed to n8n workflow automation platform, exploring integration possibilities and custom workflows.",
    image: "/lovable-uploads/n8n-workflow.png",
    demoUrl: "https://n8n.io",
    webPreviewUrl: "https://n8n.io",
    githubUrl: "https://github.com/chrisgates32/n8n",
    technologies: ["TypeScript", "Workflow Automation", "API Integration"],
    type: "github",
    status: "in-progress"
  },
  {
    id: "6",
    title: "Document Automation",
    description: "PDF document workflow automation system for streamlining approval processes and reducing manual tasks.",
    image: "/lovable-uploads/document-automation.png",
    demoUrl: "https://document-automation.lovable.app",
    webPreviewUrl: "https://document-automation.lovable.app",
    githubUrl: "https://github.com/chrisgates32/pdfify-fun-workflow",
    technologies: ["PDF Processing", "Workflow Automation", "React"],
    type: "github",
    status: "completed"
  },
  {
    id: "7",
    title: "Butterfly Blue Creations",
    description: "E-commerce platform for custom merchandise and print-on-demand products with automated inventory management.",
    image: "/lovable-uploads/butterfly-blue.png",
    previewImage: "/lovable-uploads/butterfly-preview.png",
    demoUrl: "https://preview--butterflyblue-creation.lovable.app/",
    webPreviewUrl: "https://preview--butterflyblue-creation.lovable.app/",
    githubUrl: "https://github.com/chrisgates32/butterflybluecreations",
    technologies: ["Python", "TypeScript", "E-commerce", "POD"],
    type: "lovable",
    status: "completed"
  },
  {
    id: "8",
    title: "Learning Python",
    description: "My journey learning Python fundamentals for technical diagnostics and automation scripts.",
    image: "/lovable-uploads/learning-python.png",
    demoUrl: "https://python-learning.lovable.app",
    webPreviewUrl: "https://python-learning.lovable.app",
    githubUrl: "https://github.com/chrisgates32/learning-python",
    technologies: ["Python", "Automation", "Scripting"],
    type: "github",
    status: "in-progress"
  },
  {
    id: "9",
    title: "LM Studio VS Code",
    description: "Exploration of local language model integration with VS Code for enhanced coding assistance.",
    image: "/lovable-uploads/lm-studio-vscode.png",
    demoUrl: "https://lmstudio-vscode.lovable.app",
    webPreviewUrl: "https://lmstudio-vscode.lovable.app",
    githubUrl: "https://github.com/chrisgates32/lm-studio-vscode",
    technologies: ["TypeScript", "VS Code Extension", "AI Integration"],
    type: "github",
    status: "in-progress"
  }
];
