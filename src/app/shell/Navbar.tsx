import { NavLink } from "react-router-dom";
import Container from "../../components/ui/Container";
import { profile } from "../../data/profile";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "./theme";
import { useMemo, useState } from "react";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/resume", label: "Resume" },
  { to: "/contact", label: "Contact" }
];

function NavItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      end={to === "/"}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "rounded-lg px-3 py-2 text-sm transition",
          isActive
            ? "text-blue-300 bg-blue-500/10"
            : "text-zinc-200 hover:text-white hover:bg-white/5"
        ].join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);

  const ThemeIcon = useMemo(() => (theme === "dark" ? Sun : Moon), [theme]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0b0f14]/70 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Left: initials */}
          <NavLink
            to="/"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-semibold text-zinc-100 hover:bg-white/8"
            aria-label="Go to home"
          >
            {profile.initials}
          </NavLink>

          {/* Center: desktop menu */}
          <nav className="hidden md:flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-2 py-1">
            {navItems.map((n) => (
              <NavItem key={n.to} to={n.to} label={n.label} />
            ))}
          </nav>

          {/* Right: controls */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggle}
              aria-label="Toggle theme"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              <ThemeIcon size={18} />
            </button>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-100 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="md:hidden pb-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-2">
              <div className="grid grid-cols-2 gap-1">
                {navItems.map((n) => (
                  <NavItem
                    key={n.to}
                    to={n.to}
                    label={n.label}
                    onClick={() => setOpen(false)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
