
import React from 'react';
import { skillCategories } from '@/data/skills';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Skills & <span className="gradient-text">Technologies</span></h2>
          <p className="text-white/70">
            My evolving technical toolkit - focused on AI automation, development tools, and security systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((category) => (
            <div key={category.name} className="bg-slate-800/60 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-slate-700 animate-slide-up hover:border-accent/50 transition-colors duration-300">
              <h3 className="text-xl font-semibold mb-6 gradient-text">{category.name}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span className="text-white">{skill.name}</span>
                      <span className="text-white/60">{skill.level}/5</span>
                    </div>
                    <Progress 
                      value={skill.level * 20} 
                      className="h-2 bg-slate-700" 
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-semibold mb-6 text-white text-center">Additional <span className="gradient-text">Tools & Technologies</span></h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">VS Code</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Docker</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">n8n</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">LM Studio</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">GitHub</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">GitLab</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">ChatGPT</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">DeepSeek</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Cody</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Copilot</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Lovable</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Vercel</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Printify</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Shopify</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">A2A Protocol</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">RAG/Vector DB</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">MCP</Badge>
            <Badge className="bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 text-sm">Python</Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
