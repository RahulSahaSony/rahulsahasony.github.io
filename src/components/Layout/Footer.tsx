// src/components/Layout/Footer.tsx
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/data/profile";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row max-w-4xl">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {currentYear} {profile.name}. Built with React.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github size={18} />
            <span className="sr-only">GitHub</span>
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Linkedin size={18} />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a
            href={`mailto:${profile.links.email}`}
            className="text-muted-foreground hover:text-foreground"
          >
            <Mail size={18} />
            <span className="sr-only">Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
