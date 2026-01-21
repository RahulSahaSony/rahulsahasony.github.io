import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import Chip from "../components/ui/Chip";
import { profile } from "../data/profile";

export default function About() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-zinc-50">About</h1>
      <Divider />

      <div className="max-w-3xl space-y-4 text-zinc-300">
        {profile.about.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-50">Skills</h2>
        <Divider />

        <div className="grid gap-6 md:grid-cols-2">
          {profile.skills.map((g) => (
            <div key={g.group}>
              <div className="text-sm font-semibold text-zinc-200">{g.group}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {g.items.map((s) => (
                  <Chip key={s}>{s}</Chip>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-semibold text-zinc-50">Education</h2>
        <Divider />

        <div className="space-y-4">
          {profile.education.map((e) => (
            <div key={e.degree} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <div className="font-semibold text-zinc-50">{e.degree}</div>
              <div className="mt-1 text-sm text-zinc-300">
                {e.school} • {e.year}
                {e.gpa ? ` • GPA: ${e.gpa}` : ""}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}
