'use client'

import { Sparkles } from "lucide-react";
import {useEditorStore} from "@/store/editorStore";
import {ThemeToggle} from "@/components/layout/ThemeToggle";
import { askAI } from "@/lib/ai";

export default function Navbar() {
    const markdown = useEditorStore((state) => state.markdown);
    const setMarkdown = useEditorStore((state) => state.setMarkdown);
    const isAILoading = useEditorStore((state) => state.isAILoading);
    const setIsAILoading = useEditorStore((state) => state.setIsAILoading);
    const filename = useEditorStore((state) => state.filename);

    const improveMarkdown = async () => {
      console.log('Clicked...')
      try {
        setIsAILoading(true);
        const { text } = await askAI(`
          Improve this markdown professionally.
          Return ONLY markdown.
          ${markdown}
          `);
          const cleanedText = text.replace(/```markdown/g, "").replace(/```md/g, "").replace(/```/g, "").trim();
          setMarkdown(cleanedText);
        } catch (error) {
          console.log(error);
        } finally {
          setIsAILoading(false);
        }
      };

      const exportMarkdown = () => {
        const blob = new Blob([markdown], {
          type: "text/markdown",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-background/80 px-6 py-2 backdrop-blur-xl sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="flex h-fit w-4 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Sparkles size={18} />
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-tight">readmd</h4>
        </div>
      </div>
        <span className="flex gap-2">
           <button onClick={improveMarkdown} className="px-3 py-1 rounded-xl border text-[--text-primary] border-[var(--border)] hover:bg-muted transition-colors bg-[--foreground] disabled:cursor-not-allowed disabled:opacity-50">
        {isAILoading ? "✨ Improving..." : "✨ Improve"}
        </button>
            <ThemeToggle />
        <button onClick={() => setMarkdown('')} className="rounded-xl  bg-[#ff000033] text-[#ff0000] px-4 py-1 text-sm transition-all hover:bg-accent">
            Clear
        </button>
      <button onClick={exportMarkdown} className="rounded-xl bg-black text-white px-4 py-1 text-sm transition-all bg-primary hover:bg-[var(--primary-foreground)] hover:border-[var(--primary)] border-[var(--primary)]">
        Export
      </button>
        </span>
    </header>
  );
}