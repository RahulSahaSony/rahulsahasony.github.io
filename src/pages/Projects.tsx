// src/pages/Projects.tsx
import { useState } from "react";
import { Github, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/UI/Button";
import { Chip } from "@/components/UI/Chip";
import { Divider } from "@/components/UI/Divider";

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  
  // Extract all unique tech tags
  const allTechs = Array.from(
    new Set(profile.allProjects.flatMap((project) => project.tech))
  ).sort();
  
  // Filter projects based on selected tech
  const filteredProjects =
    filter === "All"
      ? profile.allProjects
      : profile.allProjects.filter((project) => project.tech.includes(filter));
  
  return (
    <div className="container max-w-4xl py-12">
      <section className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tighter">Projects</h1>
        
        <div className="flex flex-wrap gap-2 pb-4">
          <Chip
            className={`cursor-pointer ${
              filter === "All" ? "bg-blue-600 text-white" : ""
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </Chip>
          {allTechs.map((tech) => (
            <Chip
              key={tech}
              className={`cursor-pointer ${
                filter === tech ? "bg-blue-600 text-white" : ""
              }`}
              onClick={() => setFilter(tech)}
            >
              {tech}
            </Chip>
          ))}
        </div>
        
        <div className="space-y-8">
          {filteredProjects.map((project, index) => (
            <div key={project.id}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-medium">{project.title}</h3>
                  <p className="text-muted-foreground">{project.description}</p>
                  <div>
                    <span className="text-sm font-medium text-blue-500">Impact: </span>
                    <span className="text-sm text-muted-foreground">{project.impact}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Chip key={tech}>{tech}</Chip>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {project.githubUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.githubUrl} target="_blank" rel="noreferrer">
                        <Github size={16} />
                        <span className="sr-only">GitHub</span>
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={project.demoUrl} target="_blank" rel="noreferrer">
                        <ExternalLink size={16} />
                        <span className="sr-only">Demo</span>
                      </a>
                    </Button>
                  )}
                </div>
              </div>
              {index < filteredProjects.length - 1 && <Divider className="mt-8" />}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
