
import React from 'react';
import { GitCommit, Github, GitBranch, Clock } from 'lucide-react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';

type ContributionEntry = {
  date: string;
  repository: string;
  commits?: number;
  language?: string;
  type: 'commit' | 'create' | 'join';
};

const contributions: ContributionEntry[] = [
  { date: "Apr 28, 2025", repository: "my-resume", commits: 28, language: "HTML", type: "commit" },
  { date: "Apr 27, 2025", repository: "skills-introduction-to-github", commits: 1, type: "commit" },
  { date: "Apr 26, 2025", repository: "lm-studio-vscode", commits: 3, language: "TypeScript", type: "commit" },
  { date: "Apr 23, 2025", repository: "NicheAuto", commits: 2, language: "TypeScript", type: "commit" },
  { date: "Apr 20, 2025", repository: "n8n", language: "TypeScript", type: "commit" },
  { date: "Apr 12, 2025", repository: "automastery-n8n-knight", language: "TypeScript", type: "commit" },
  { date: "Mar 25, 2025", repository: "pod_saasV1", commits: 42, language: "JavaScript", type: "commit" },
  { date: "Mar 25, 2025", repository: "pod_saas", commits: 1, type: "commit" },
  { date: "Mar 9, 2025", repository: "butterflyblue-creation", language: "TypeScript", type: "commit" },
  { date: "Mar 2, 2025", repository: "butterflybluecreations", language: "TypeScript", type: "commit" },
  { date: "Mar 2, 2025", repository: "butterflyblue_creations", type: "commit" },
  { date: "Mar 2, 2025", repository: "ButterflyBlue-Creations", language: "Python", type: "commit" },
  { date: "Feb 3, 2025", repository: "learning-python", commits: 3, type: "create" },
  { date: "Jan 12, 2025", repository: "GitHub", type: "join" }
];

const GitHubActivity: React.FC = () => {
  return (
    <section id="github-activity" className="section-padding bg-gradient-to-b from-slate-950 to-slate-900 relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgZmlsbD0iIzIxMjEyMSIgZmlsbC1vcGFjaXR5PSIwLjMiPgogICAgICAgICAgICA8cGF0aCBkPSJNMzAgMzBhMSAxIDAgMSAxIDAtMiAxIDEgMCAwIDEgMCAyWiIgLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==')] opacity-10 z-0"></div>
      
      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">GitHub <span className="gradient-text">Contributions</span></h2>
          <p className="text-white/70">
            My journey of learning and building through code contributions since joining GitHub in January 2025.
          </p>
        </div>

        <div className="relative mt-20 mb-10 overflow-hidden">
          <div className="absolute top-0 bottom-0 left-[20px] md:left-1/2 w-0.5 bg-gradient-to-b from-accent via-purple-500 to-transparent"></div>
          
          <div className="space-y-10">
            {contributions.map((contribution, index) => (
              <div 
                key={`${contribution.repository}-${contribution.date}`}
                className={`relative flex flex-col md:flex-row md:items-center gap-4 ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div 
                  className={`flex-1 ${
                    index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'
                  }`}
                >
                  <div className="bg-slate-800/60 p-5 rounded-lg border border-slate-700 hover:border-accent/50 transition-all duration-300 backdrop-blur-sm shadow-lg">
                    <div className="flex flex-col gap-1">
                      <h3 className="flex items-center gap-2 text-lg font-medium text-white">
                        {index % 2 === 0 && <span className="md:hidden"><Github size={16} /></span>}
                        <span>{contribution.repository}</span>
                        {index % 2 !== 0 && <span className="md:hidden"><Github size={16} /></span>}
                      </h3>
                      
                      <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                        <Clock size={14} />
                        <span>{contribution.date}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-2">
                        {contribution.type === 'commit' && contribution.commits && (
                          <span className="inline-flex items-center text-xs bg-slate-700/50 text-white px-2 py-1 rounded">
                            <GitCommit size={12} className="mr-1" />
                            {contribution.commits} commits
                          </span>
                        )}
                        
                        {contribution.type === 'create' && (
                          <span className="inline-flex items-center text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">
                            <GitBranch size={12} className="mr-1" />
                            First repository
                          </span>
                        )}
                        
                        {contribution.type === 'join' && (
                          <span className="inline-flex items-center text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded">
                            <Github size={12} className="mr-1" />
                            Joined GitHub
                          </span>
                        )}
                        
                        {contribution.language && (
                          <span className="text-xs bg-slate-700/50 text-white px-2 py-1 rounded">
                            {contribution.language}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="absolute left-0 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-purple-600 flex items-center justify-center text-white shadow-glow">
                    {contribution.type === 'commit' ? (
                      <GitCommit size={16} />
                    ) : contribution.type === 'create' ? (
                      <GitBranch size={16} />
                    ) : (
                      <Github size={16} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a 
            href="https://github.com/Chriscg32" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-full transition-colors duration-300"
          >
            <Github size={18} />
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
