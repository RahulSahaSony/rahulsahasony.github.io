import Container from "../components/ui/Container";
import Divider from "../components/ui/Divider";
import Card from "../components/ui/Card";
import { profile } from "../data/profile";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";

const iconByLabel: Record<string, JSX.Element> = {
  Email: <Mail size={18} />,
  LinkedIn: <Linkedin size={18} />,
  GitHub: <Github size={18} />,
  Location: <MapPin size={18} />
};

export default function Contact() {
  return (
    <Container>
      <h1 className="text-3xl font-bold text-zinc-50">Contact</h1>
      <Divider />

      <p className="max-w-2xl text-zinc-300">{profile.contact.intro}</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {profile.contact.cards.map((c) => (
          <Card key={c.label}>
            <div className="p-5 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-100">
                {iconByLabel[c.label] ?? <Mail size={18} />}
              </div>

              <div className="min-w-0">
                <div className="text-sm font-semibold text-zinc-50">{c.label}</div>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noreferrer" : undefined}
                    className="mt-1 block truncate text-sm text-zinc-300 hover:text-white"
                  >
                    {c.value}
                  </a>
                ) : (
                  <div className="mt-1 text-sm text-zinc-300">{c.value}</div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex gap-3">
          <div className="w-1 rounded-full bg-blue-500/80" />
          <div>
            <div className="text-sm font-semibold text-zinc-50">Best way to reach me:</div>
            <div className="mt-1 text-sm text-zinc-300">{profile.contact.bestWay}</div>
          </div>
        </div>
      </div>
    </Container>
  );
}
