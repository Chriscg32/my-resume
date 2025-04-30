
import React from 'react';
import { skillCategories } from '@/data/skills';
import { Progress } from '@/components/ui/progress';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-padding">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-muted-foreground">
            I'm constantly learning and expanding my technical toolkit. Here are the technologies I'm proficient with.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {skillCategories.map((category) => (
            <div key={category.name} className="bg-card p-6 rounded-lg shadow-md animate-slide-up">
              <h3 className="text-xl font-semibold mb-6 gradient-text">{category.name}</h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1">
                      <span>{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}/5</span>
                    </div>
                    <Progress value={skill.level * 20} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
