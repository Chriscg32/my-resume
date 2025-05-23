
import React, { useState } from 'react';
import { projects, ProjectType } from '@/data/projects';
import ProjectCard from './ProjectCard';
import GitHubCard from './GitHubCard';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import LovableLogo from './LovableLogo';

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<ProjectType | 'all'>('all');
  const isMobile = useIsMobile();
  
  const lovableProjects = projects.filter(project => project.type === 'lovable');
  const githubProjects = projects.filter(project => project.type === 'github');
  
  // Filter projects based on the active category
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.type === activeCategory);

  return (
    <section id="projects" className="section-padding bg-gradient-to-b from-slate-900 to-slate-950 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzIxMjEyMSIgZmlsbC1vcGFjaXR5PSIwLjMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzAgMzBhMSAxIDAgMSAxIDAtMiAxIDEgMCAwIDEgMCAyWiIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')] opacity-10 z-0"></div>
      
      <div className="container relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My <span className="gradient-text">Projects</span></h2>
          <p className="text-white/70 mb-6">
            A showcase of my work built with Lovable and GitHub - demonstrating my exploration of AI automation, development tools, and practical applications.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800/60 border border-slate-700">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>All</TabsTrigger>
            <TabsTrigger value="lovable" onClick={() => setActiveCategory('lovable')}>Lovable</TabsTrigger>
            <TabsTrigger value="github" onClick={() => setActiveCategory('github')}>GitHub</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-8">
            <div className="space-y-16">
              {/* Lovable Projects Section */}
              <div>
                <div className="mb-8">
                  <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm p-4">
                    <CardContent className="p-2">
                      <div className="flex flex-col md:flex-row items-center gap-4 text-left">
                        {!isMobile ? (
                          <>
                            <div className="rounded-lg overflow-hidden border border-purple-500/30 w-full md:w-1/3">
                              <LovableLogo />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-xl font-semibold text-white mb-2">Built with <span className="gradient-text">Lovable AI</span></h3>
                              <p className="text-white/70 text-sm mb-4">
                                Many of these projects were built using Lovable's AI editor - a revolutionary platform for creating web applications through natural language. 
                                The projects marked with "Lovable" showcase what's possible with AI assistance.
                              </p>
                              <Button asChild size="sm" variant="secondary">
                                <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                  <span>Learn about Lovable</span>
                                  <ExternalLink size={14} />
                                </a>
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="w-full flex flex-col items-center">
                              <div className="rounded-lg overflow-hidden border border-purple-500/30 w-full max-w-[200px]">
                                <LovableLogo />
                              </div>
                              <div className="mt-4 text-center">
                                <h3 className="text-xl font-semibold text-white mb-2">Built with <span className="gradient-text">Lovable AI</span></h3>
                                <p className="text-white/70 text-sm mb-4">
                                  Many of these projects were built using Lovable's AI editor - a revolutionary platform for creating web applications through natural language.
                                </p>
                                <Button asChild size="sm" variant="secondary">
                                  <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                    <span>Learn about Lovable</span>
                                    <ExternalLink size={14} />
                                  </a>
                                </Button>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {lovableProjects.map((project, index) => (
                    <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <ProjectCard project={project} index={index} />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* GitHub Projects Section */}
              <div className="mt-16">
                <div className="mb-8">
                  <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm p-4">
                    <CardContent className="p-2">
                      <div className="flex flex-col items-center gap-4 text-left">
                        <div className="w-full">
                          <h3 className="text-xl font-semibold text-white mb-2">GitHub <span className="gradient-text">Projects</span></h3>
                          <p className="text-white/70 text-sm">
                            These projects showcase my coding journey and open-source contributions. Each repository represents skills I've developed and problems I've solved.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {githubProjects.map((project, index) => (
                    <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${(index + lovableProjects.length) * 0.1}s` }}>
                      <GitHubCard project={project} index={index} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="lovable" className="mt-8">
            <div className="mb-8">
              <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm p-4">
                <CardContent className="p-2">
                  <div className="flex flex-col md:flex-row items-center gap-4 text-left">
                    {!isMobile ? (
                      <>
                        <div className="rounded-lg overflow-hidden border border-purple-500/30 w-full md:w-1/3">
                          <LovableLogo />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-white mb-2">Built with <span className="gradient-text">Lovable AI</span></h3>
                          <p className="text-white/70 text-sm mb-4">
                            Many of these projects were built using Lovable's AI editor - a revolutionary platform for creating web applications through natural language. 
                            The projects marked with "Lovable" showcase what's possible with AI assistance.
                          </p>
                          <Button asChild size="sm" variant="secondary">
                            <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                              <span>Learn about Lovable</span>
                              <ExternalLink size={14} />
                            </a>
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-full flex flex-col items-center">
                          <div className="rounded-lg overflow-hidden border border-purple-500/30 w-full max-w-[200px]">
                            <LovableLogo />
                          </div>
                          <div className="mt-4 text-center">
                            <h3 className="text-xl font-semibold text-white mb-2">Built with <span className="gradient-text">Lovable AI</span></h3>
                            <p className="text-white/70 text-sm mb-4">
                              Many of these projects were built using Lovable's AI editor - a revolutionary platform for creating web applications through natural language.
                            </p>
                            <Button asChild size="sm" variant="secondary">
                              <a href="https://lovable.ai" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <span>Learn about Lovable</span>
                                <ExternalLink size={14} />
                              </a>
                            </Button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lovableProjects.map((project, index) => (
                <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <ProjectCard project={project} index={index} />
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="github" className="mt-8">
            <div className="mb-8">
              <Card className="bg-slate-800/40 border-slate-700 backdrop-blur-sm p-4">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center gap-4 text-left">
                    <div className="w-full">
                      <h3 className="text-xl font-semibold text-white mb-2">GitHub <span className="gradient-text">Projects</span></h3>
                      <p className="text-white/70 text-sm">
                        These projects showcase my coding journey and open-source contributions. Each repository represents skills I've developed and problems I've solved.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {githubProjects.map((project, index) => (
                <div key={project.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <GitHubCard project={project} index={index} />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Projects;
