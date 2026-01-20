// src/pages/Home.tsx
import { Github, Linkedin, Download, ExternalLink } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/UI/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/UI/Card";
import { Chip } from "@/components/UI/Chip";
import { Divider } from "@/components/UI/Divider";

export const Home = () => {
  return (
    <div className="container max-w-4xl py-12">
      <section className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>
          <p className="text-xl text-muted-foreground">
            {profile.headline}
          </p>
          <p className="text-muted-foreground max-w-[700px]">
            {profile.subheadline}
          </p>
        </div>
        
        <div className="flex flex-wrap gap-4">
          <Button icon={<Download size={16} />} asChild>
            <a href={profile.links.resume} download>
              Resume
            </a>
          </Button>
          <Button variant="outline" icon={<Linkedin size={16} />} asChild>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" icon={<Github size={16} />} asChild>
            <a href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </Button>
        </div>
      </section>
      
      <Divider className="my-12" />
      
      <section className="space-y-4">
        <h2 className="text-2xl font-bold tracking-tighter">Now</h2>
        <p className="text-muted-foreground max-w-[700px]">
          {profile.now}
        </p>
      </section>
      
      <Divider className="my-12" />
      
      <section className="space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {profile.featuredProjects.map((project) => (
            <Card key={project.id} className="relative">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-sm font-medium text-blue-500">Impact: </span>
                  <span className="text-sm text-muted-foreground">{project.impact}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
                <div className="flex justify-end space-x-2">
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
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex justify-center">
          <Button variant="outline" asChild>
            <a href="/projects">View all projects</a>
          </Button>
        </div>
      </section>
    </div>
  );
};
