import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  leftIcon,
  ariaLabel,
  className = "",
  download
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  leftIcon?: ReactNode;
  ariaLabel?: string;
  className?: string;
  download?: boolean;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-blue-500/40";
  const styles: Record<Variant, string> = {
    primary: "bg-blue-600 text-white hover:bg-blue-500",
    secondary: "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/8 hover:border-white/25",
    ghost: "text-zinc-200 hover:text-white hover:bg-white/5"
  };

  const cls = `${base} ${styles[variant]} ${className}`;

  if (href) {
    return (
      <a
        className={cls}
        href={href}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        aria-label={ariaLabel}
        download={download}
      >
        {leftIcon}
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} aria-label={ariaLabel}>
      {leftIcon}
      {children}
    </button>
  );
}
