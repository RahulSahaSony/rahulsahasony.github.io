import Container from "../../components/ui/Container";
import { profile } from "../../data/profile";

export default function Footer() {
  const year = new Date().getFullYear();

  const linkCls = "text-zinc-300 hover:text-white";
  return (
    <footer className="border-t border-white/10">
      <Container>
        <div className="py-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-zinc-400">
            © {year} {profile.name}. Built with React.
          </div>

          <div className="flex items-center gap-3 text-sm">
            <a className={linkCls} href={profile.links.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <span className="text-white/10">•</span>
            <a className={linkCls} href={profile.links.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <span className="text-white/10">•</span>
            <a className={linkCls} href={profile.links.email}>
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
