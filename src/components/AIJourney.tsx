
import React from 'react';
import { Milestone } from '@/data/journey';
import { journeyData } from '@/data/journey';
import { CheckCircle } from 'lucide-react';

const AIJourney: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">My <span className="gradient-text">AI Journey</span></h2>
          <p className="text-white/70 text-lg">
            From technical support specialist to AI automation enthusiast - my 4-month transformation exploring AI tools, automation platforms, and development skills.
          </p>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-purple-900"></div>
          
          {/* Timeline Events */}
          <div className="space-y-12">
            {journeyData.map((milestone, index) => (
              <div 
                key={index} 
                className={`relative flex flex-col md:flex-row gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className="ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div 
                    className={`bg-slate-800 p-6 rounded-lg shadow-xl ${
                      index % 2 === 0 ? 'md:mr-6' : 'md:ml-6'
                    } border-l-4 border-accent hover:bg-slate-800/70 transition-colors duration-300`}
                  >
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">{milestone.date}</span>
                    <h3 className="text-xl md:text-2xl font-bold mt-1 mb-3 text-white">{milestone.title}</h3>
                    <p className="text-white/80 mb-4">{milestone.description}</p>
                    <div className="space-y-2">
                      {milestone.achievements.map((achievement, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <CheckCircle className="text-accent shrink-0 mt-1" size={16} />
                          <span className="text-white/70">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Timeline Dot */}
                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 rounded-full bg-accent shadow-lg shadow-accent/30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-white"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIJourney;
