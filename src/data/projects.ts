
export type ProjectType = 'lovable' | 'github';

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
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
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    demoUrl: "https://niche-finder-pro-launch.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/NicheAuto",
    technologies: ["TypeScript", "React", "AI Integration", "Market Analysis"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "2",
    title: "Automastery n8n Knight",
    description: "Workflow automation project exploring n8n capabilities with Docker deployment and AI-driven workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    demoUrl: "https://automastery-n8n-knight.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/automastery-n8n-knight",
    technologies: ["n8n", "Docker", "Workflow Automation", "API Integration"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "3",
    title: "LeadSpark AI",
    description: "Lead generation system that uses AI to qualify prospects and automate initial outreach communications.",
    image: "https://images.unsplash.com/photo-1534012720141-2f12a4963765?q=80&w=1597&auto=format&fit=crop",
    demoUrl: "https://leadspark-ai-ignite.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/lead-spark",
    technologies: ["AI", "React", "TypeScript", "CRM Integration"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "4",
    title: "MerchFusion",
    description: "E-commerce automation platform that connects Printify designs to Shopify with automated workflow triggers.",
    image: "https://images.unsplash.com/photo-1603400521630-9f2de124b33b?q=80&w=1374&auto=format&fit=crop",
    demoUrl: "https://merchfusion.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/pod_saas",
    technologies: ["Printify API", "Shopify", "Automation", "E-commerce"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "5",
    title: "n8n Workflows",
    description: "Contributed to n8n workflow automation platform, exploring integration possibilities and custom workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop",
    demoUrl: "https://n8n.io",
    githubUrl: "https://github.com/chrisgates32/n8n",
    technologies: ["TypeScript", "Workflow Automation", "API Integration"],
    type: "github",
    status: "in-progress"
  },
  {
    id: "6",
    title: "Document Automation",
    description: "PDF document workflow automation system for streamlining approval processes and reducing manual tasks.",
    image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1470&auto=format&fit=crop",
    demoUrl: "https://docu-approve-ninja.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/pdfify-fun-workflow",
    technologies: ["PDF Processing", "Workflow Automation", "React"],
    type: "github",
    status: "in-progress"
  },
  {
    id: "7",
    title: "Butterfly Blue Creations",
    description: "E-commerce platform for custom merchandise and print-on-demand products with automated inventory management.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=1470&auto=format&fit=crop",
    demoUrl: "https://butterflyblue-creation.lovable.ai",
    githubUrl: "https://github.com/chrisgates32/butterflybluecreations",
    technologies: ["Python", "TypeScript", "E-commerce", "POD"],
    type: "lovable",
    status: "in-progress"
  },
  {
    id: "8",
    title: "Learning Python",
    description: "My journey learning Python fundamentals for technical diagnostics and automation scripts.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=1632&auto=format&fit=crop",
    demoUrl: "",
    githubUrl: "https://github.com/chrisgates32/learning-python",
    technologies: ["Python", "Automation", "Scripting"],
    type: "github",
    status: "in-progress"
  },
  {
    id: "9",
    title: "LM Studio VS Code",
    description: "Exploration of local language model integration with VS Code for enhanced coding assistance.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=1631&auto=format&fit=crop",
    demoUrl: "",
    githubUrl: "https://github.com/chrisgates32/lm-studio-vscode",
    technologies: ["TypeScript", "VS Code Extension", "AI Integration"],
    type: "github",
    status: "in-progress"
  }
];
