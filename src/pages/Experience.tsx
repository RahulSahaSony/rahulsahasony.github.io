import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import { profile } from "../data/profile";

export default function Experience() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-zinc-50">Experience</h1>
      <Divider />

      <div className="divide-y divide-white/10">
        {profile.experience.map((r) => (
          <div key={`${r.company}-${r.title}`} className="py-6">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
              <div>
                <div className="text-lg font-semibold text-zinc-50">{r.title}</div>
                <div className="text-sm text-zinc-300">{r.company}</div>
              </div>
              <div className="text-sm text-zinc-400">
                {r.dates} • {r.location}
              </div>
            </div>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-zinc-300">
              {r.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Container>
  );
}
