import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import Card from "../components/ui/Card";
import Chip from "../components/ui/Chip";
import Button from "../components/ui/Button";
import { profile } from "../data/profile";
import { FileText, Github, Linkedin, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Container>
      {/* Hero */}
      <section className="pt-6">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-zinc-50">
          {profile.name}
        </h1>
        <p className="mt-3 text-lg text-zinc-300">{profile.headline}</p>
        <p className="mt-4 max-w-2xl text-zinc-300/90">{profile.subheadline}</p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Button href={profile.links.resume} variant="primary" leftIcon={<FileText size={16} />}>
            Resume
          </Button>
          <Button
            href={profile.links.linkedin}
            variant="secondary"
            leftIcon={<Linkedin size={16} />}
            ariaLabel="Open LinkedIn"
          >
            LinkedIn
          </Button>
          <Button
            href={profile.links.github}
            variant="secondary"
            leftIcon={<Github size={16} />}
            ariaLabel="Open GitHub"
          >
            GitHub
          </Button>
        </div>
      </section>

      {/* Now */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold tracking-wide text-zinc-200">Now</h2>
        </div>
        <Divider />
        <p className="text-zinc-300">{profile.now}</p>
      </section>

      {/* Featured Projects */}
      <section className="mt-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-zinc-50">Featured Projects</h2>
          <Link to="/projects" className="text-sm text-blue-300 hover:text-blue-200">
            View all
          </Link>
        </div>
        <Divider />

        <div className="grid gap-4 md:grid-cols-3">
          {profile.featuredProjects.map((p) => (
            <Card key={p.title}>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-semibold text-zinc-50">{p.title}</div>
                    <p className="mt-2 text-sm text-zinc-300">{p.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open GitHub"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/8"
                      >
                        <Github size={16} />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Open demo"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 hover:bg-white/8"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="mt-4 text-sm">
                  <span className="font-semibold text-blue-300">Impact:</span>{" "}
                  <span className="text-zinc-300">{p.impact}</span>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-6">
          <Link to="/projects">
            <Button variant="ghost" leftIcon={<ExternalLink size={16} />}>
              View all projects
            </Button>
          </Link>
        </div>
      </section>
    </Container>
  );
}
