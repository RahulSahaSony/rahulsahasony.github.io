import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import Card from "../components/ui/Card";
import { profile } from "../data/profile";
import { Download, Printer } from "lucide-react";

export default function Resume() {
  const onPrint = () => window.print();

  // Preferred: /public/resume.pdf
  const pdfHref = "/resume.pdf";

  return (
    <Container>
      <div className="no-print">
        <h1 className="text-3xl font-bold text-zinc-50">Resume</h1>
        <Divider />

        <div className="flex flex-wrap gap-3">
          <Button
            href={pdfHref}
            variant="primary"
            leftIcon={<Download size={16} />}
            ariaLabel="Download PDF"
            download
          >
            Download PDF
          </Button>
          <Button
            onClick={onPrint}
            variant="secondary"
            leftIcon={<Printer size={16} />}
            ariaLabel="Print resume"
          >
            Print
          </Button>
        </div>

        <p className="mt-4 text-sm text-zinc-400">
          Note: Replace <span className="text-zinc-200">public/resume.pdf</span> with your real PDF.
          If you don’t have one, printing this page works as a clean fallback.
        </p>

        <Divider />
      </div>

      {/* Printable resume surface */}
      <Card>
        <div className="print-surface p-6 sm:p-8">
          <div className="flex flex-col gap-2">
            <div className="text-2xl font-bold text-zinc-50">{profile.name}</div>
            <div className="text-sm text-zinc-300">{profile.resumePage.bestLine}</div>
            <div className="text-sm text-zinc-400 print-text-muted">{profile.resumePage.locationLine}</div>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <div className="text-sm font-semibold text-zinc-50">Skills</div>
            <div className="mt-3 grid gap-5 md:grid-cols-2">
              {profile.skills.map((g) => (
                <div key={g.group}>
                  <div className="text-xs font-semibold text-zinc-300">{g.group}</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {g.items.map((s) => (
                      <Chip key={s}>{s}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="text-sm font-semibold text-zinc-50">Experience</div>
            <div className="mt-4 space-y-6">
              {profile.experience.map((r) => (
                <div key={`${r.company}-${r.title}`}>
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div>
                      <div className="font-semibold text-zinc-50">{r.title}</div>
                      <div className="text-sm text-zinc-300">{r.company}</div>
                    </div>
                    <div className="text-sm text-zinc-400 print-text-muted">
                      {r.dates} • {r.location}
                    </div>
                  </div>
                  <ul className="mt-3 list-disc pl-5 space-y-1 text-sm text-zinc-300">
                    {r.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="text-sm font-semibold text-zinc-50">Projects</div>
            <div className="mt-4 space-y-5">
              {profile.featuredProjects.map((p) => (
                <div key={p.title}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-semibold text-zinc-50">{p.title}</div>
                      <div className="mt-1 text-sm text-zinc-300">{p.description}</div>
                      <div className="mt-2 text-sm">
                        <span className="font-semibold text-blue-300">Impact:</span>{" "}
                        <span className="text-zinc-300">{p.impact}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <Chip key={t}>{t}</Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="text-sm font-semibold text-zinc-50">Education</div>
            <div className="mt-4 space-y-3">
              {profile.education.map((e) => (
                <div key={e.degree} className="text-sm text-zinc-300">
                  <span className="font-semibold text-zinc-50">{e.degree}</span>{" "}
                  <span className="text-zinc-300">— {e.school}</span>{" "}
                  <span className="text-zinc-400 print-text-muted">({e.year}{e.gpa ? `, GPA: ${e.gpa}` : ""})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
}
