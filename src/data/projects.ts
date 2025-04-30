
export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  demoUrl: string;
  githubUrl: string;
  technologies: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A full-featured online shopping platform with cart functionality, user authentication, and payment processing.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=1470&auto=format&fit=crop",
    demoUrl: "https://example.com/demo1",
    githubUrl: "https://github.com/username/e-commerce-platform",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API"]
  },
  {
    id: "2",
    title: "Task Management App",
    description: "A productivity tool for teams to manage projects, track tasks, and collaborate efficiently.",
    image: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?q=80&w=1632&auto=format&fit=crop",
    demoUrl: "https://example.com/demo2",
    githubUrl: "https://github.com/username/task-management",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"]
  },
  {
    id: "3",
    title: "Weather Dashboard",
    description: "An interactive weather application that provides real-time forecasts and historical weather data.",
    image: "https://images.unsplash.com/photo-1530563885674-66db50a1af19?q=80&w=1469&auto=format&fit=crop",
    demoUrl: "https://example.com/demo3",
    githubUrl: "https://github.com/username/weather-dashboard",
    technologies: ["React", "OpenWeather API", "Chart.js"]
  },
  {
    id: "4",
    title: "Social Media Analytics",
    description: "A dashboard for tracking and analyzing social media performance across multiple platforms.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    demoUrl: "https://example.com/demo4",
    githubUrl: "https://github.com/username/social-analytics",
    technologies: ["Angular", "Express", "D3.js", "PostgreSQL"]
  }
];
