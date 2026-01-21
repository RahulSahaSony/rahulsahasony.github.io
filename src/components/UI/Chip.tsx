import { ReactNode } from "react";

export default function Chip({
  children,
  active,
  onClick,
  asButton = false
}: {
  children: ReactNode;
  active?: boolean;
  onClick?: () => void;
  asButton?: boolean;
}) {
  const base =
    "inline-flex items-center rounded-full border px-3 py-1 text-xs leading-none transition";
  const cls = active
    ? "border-blue-400/60 bg-blue-500/15 text-blue-200"
    : "border-white/10 bg-white/5 text-zinc-200 hover:border-white/20 hover:bg-white/8";

  if (asButton) {
    return (
      <button type="button" onClick={onClick} className={`${base} ${cls}`}>
        {children}
      </button>
    );
  }

  return <span className={`${base} ${cls}`}>{children}</span>;
}
