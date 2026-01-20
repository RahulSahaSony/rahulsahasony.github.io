// src/pages/Resume.tsx
import { Download, Printer } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/UI/Button";

export const Resume = () => {
  const handlePrint = () => {
    window.print();
  };
  
  return (
    <div className="container max-w-4xl py-12">
      <div className="no-print flex justify-end space-x-2 mb-6">
        <Button icon={<Download size={16} />} asChild>
          <a href={profile.links.resume} download>
            Download PDF
          </a>
        </Button>
        <Button variant="outline" icon={<Printer size={16} />} onClick={handlePrint}>
          Print
        </Button>
      </div>
      
      <div className="space-y-8">
        <header className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">{profile.name}</h1>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span>{profile.links.email}</span>
            <span>{profile.contact.phone}</span>
            <span>{profile.contact.location}</span>
            <a href={profile.links.linkedin} className="hover:text-foreground">
              LinkedIn
            </a>
            <a href={profile.links.github} className="hover:text-foreground">
              GitHub
            </a>
          </div>
        </header>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Education</h2>
          <div className="space-y-4">
            {profile.education.map((edu) => (
              <div key={edu.id} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{edu.degree}</h3>
                  <span className="text-sm text-muted-foreground">{edu.period}</span>
                </div>
                <p className="text-muted-foreground">{edu.school}</p>
                {edu.coursework && (
                  <div>
                    <p className="text-sm font-medium mt-2">Coursework:</p>
                    <p className="text-sm text-muted-foreground">
                      {edu.coursework.join(", ")}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Experience</h2>
          <div className="space-y-6">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="font-medium">{exp.title}</h3>
                  <span className="text-sm text-muted-foreground">{exp.period}</span>
                </div>
                <p className="text-muted-foreground">{exp.company}, {exp.location}</p>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {exp.achievements.map((achievement, i) => (
                    <li key={i}>{achievement}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Projects</h2>
          <div className="space-y-4">
            {profile.allProjects.map((project) => (
              <div key={project.id} className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-medium">{project.title}</h3>
                  <span className="text-sm text-muted-foreground">{project.period}</span>
                </div>
                <p className="text-sm text-muted-foreground">{project.description}</p>
                <div>
                  <span className="text-sm font-medium">Impact: </span>
                  <span className="text-sm text-muted-foreground">{project.impact}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium">Technologies: </span>
                  {project.tech.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <section>
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="space-y-3">
            {profile.skillGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-medium">{group.title}</h3>
                <p className="text-sm text-muted-foreground">{group.skills.join(", ")}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
