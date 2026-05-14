import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur-xl">
      <div className="flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles size={18} />
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-tight">ReadMD</h4>
          <span className="text-[12px] text-[--text-secondary]">
            Beautiful README Builder
          </span>
        </div>
      </div>

      <button className="rounded-xl border border-border bg-secondary px-4 py-2 text-sm transition-all hover:bg-accent">
        Export
      </button>
    </header>
  );
}