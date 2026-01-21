export default function StickyBadgeSlot() {
  return (
    <div className="fixed bottom-5 right-5 z-40">
      {/* Reserved badge area (Edit me / removable) */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-zinc-300 shadow-soft">
        (Edit me) Badge slot
      </div>
    </div>
  );
}
