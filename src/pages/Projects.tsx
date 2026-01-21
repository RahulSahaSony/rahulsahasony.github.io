import { useMemo, useState } from "react";
import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import Chip from "../components/ui/Chip";
import { profile, Project } from "../data/profile";
import { ExternalLink, Github } from "lucide-react";

function ProjectRow({ p }: { p: Project }) {
  return (
    <div className="py-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-semibold text-zinc-50">{p.title}</div>
          <p className="mt-2 text-sm text-zinc-300 max-w-3xl">{p.description}</p>

          <div className="mt-3 text-sm">
            <span className="font-semibold text-blue-300">Impact:</span>{" "}
            <span className="text-zinc-300">{p.impact}</span>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <Chip key={t}>{t}</Chip>
            ))}
          </div>
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
    </div>
  );
}

export default function Projects() {
  const all = useMemo(() => {
    const merged: Project[] = [
      ...profile.featuredProjects,
      ...profile.allProjects
    ];
    // De-dupe by title
    const map = new Map<string, Project>();
    for (const p of merged) map.set(p.title, p);
    return Array.from(map.values());
  }, []);

  const tags = useMemo(() => {
    const set = new Set<string>();
    all.forEach((p) => p.tags.forEach((t) => set.add(t)));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [all]);

  const [active, setActive] = useState<string>("All");

  const filtered = useMemo(() => {
    if (active === "All") return all;
    return all.filter((p) => p.tags.includes(active));
  }, [active, all]);

  return (
    <Container>
      <h1 className="text-3xl font-bold text-zinc-50">Projects</h1>
      <Divider />

      <div className="flex flex-wrap gap-2">
        <Chip asButton active={active === "All"} onClick={() => setActive("All")}>
          All
        </Chip>
        {tags.map((t) => (
          <Chip key={t} asButton active={active === t} onClick={() => setActive(t)}>
            {t}
          </Chip>
        ))}
      </div>

      <Divider />

      <div className="divide-y divide-white/10">
        {filtered.length === 0 ? (
          <div className="py-10 text-zinc-300">
            No projects match this filter. (Edit me)
          </div>
        ) : (
          filtered.map((p) => <ProjectRow key={p.title} p={p} />)
        )}
      </div>
    </Container>
  );
}
