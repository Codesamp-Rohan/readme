'use client'

import { Sparkles } from "lucide-react";
import {useEditorStore} from "@/store/editorStore";
import {ThemeToggle} from "@/components/layout/ThemeToggle";
import { askAI } from "@/lib/ai";
import { useSettingsStore } from "@/store/settingsStore";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Navbar() {
    const markdown = useEditorStore((state) => state.markdown);
    const setMarkdown = useEditorStore((state) => state.setMarkdown);
    const isAILoading = useEditorStore((state) => state.isAILoading);
    const setIsAILoading = useEditorStore((state) => state.setIsAILoading);
    const filename = useEditorStore((state) => state.filename);
    const showSettings = useEditorStore((state) => state.showSettings);
    const setShowSettings = useEditorStore((state) => state.setShowSettings);
    const geminiKeys = useSettingsStore((state) => state.geminiKeys);
    const activeKeyId = useSettingsStore((state) => state.activeKeyId);
    const incrementUsage = useSettingsStore((state) => state.incrementUsage);
    const loadKeys = useSettingsStore((state) => state.loadKeys);
    const activeKey = geminiKeys.find((k) => k.id === activeKeyId);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
      setMounted(true);
      loadKeys();
    }, []);

    console.log(
  "Gemini Keys:", geminiKeys);

    const checkIfKeyExists = async () => {
        if(!activeKey) {
            alert("Please add your Gemini API key in settings.");
            setShowSettings(true);
            return;
        }
        await improveMarkdown();
    }

    const improveMarkdown = async () => {
      console.log('Clicked...')
      try {
        setIsAILoading(true);
        const { text } = await askAI(`
          Improve this markdown professionally.
          Return ONLY markdown.
          ${markdown}
          `, activeKey.key);
          const cleanedText = text.replace(/```markdown/g, "").replace(/```md/g, "").replace(/```/g, "").trim();
          const sanitizedText = cleanedText.replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi,
  "").replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "").replace(/<[^>]+>/g, "").trim();
          setMarkdown(sanitizedText);
          incrementUsage(activeKey.id);
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
        <div className="flex h-fit w-4 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Sparkles size={18} />
        </div>

        <div>
          <h4 className="text-sm font-semibold tracking-tight">readmd</h4>
        </div>
      </div>
        <span className="flex gap-2">
           <button onClick={checkIfKeyExists} className="px-3 py-1 rounded-lg border text-[--text-primary] text-sm border-[var(--border)] hover:bg-muted transition-colors bg-[--foreground] disabled:cursor-not-allowed disabled:opacity-50 hover:translate-y-[-1px] transition-[0.3s] flex items-center gap-3">
        {isAILoading ? "✨ Generating..." : "✨ Generate"}
        <p id="useage" className="!m-0 !text-[--text-primary] !text-monospace !font-mono text-xs">
          {mounted ? activeKey?.usageCount || 0 : 0}
          </p>
        </button>
            <button onClick={() => setShowSettings(!showSettings)} className="px-3 py-1 rounded-lg border text-[--text-primary] !text-sm border-[var(--border)] hover:bg-muted transition-colors bg-[--foreground] disabled:cursor-not-allowed disabled:opacity-50 hover:translate-y-[-1px] transition-[0.3s] flex items-center gap-1">
              <Image src="/assets/key.png" alt="Settings" width={16} height={16} className="inline-block" />
              API Key
            </button>
            <ThemeToggle />
        <button onClick={() => setMarkdown('')} className="rounded-lg !text-sm bg-[#ff000033] text-[#ff0000] px-4 py-1 text-sm transition-all hover:bg-accent hover:translate-y-[-1px] transition-[0.3s]">
            Clear
        </button>
      <button onClick={exportMarkdown} className="rounded-lg bg-black !text-sm text-white px-4 py-1 text-sm transition-all bg-primary hover:bg-[var(--card-foreground)] hover:border-[var(--accent-foreground)] border-[var(--primary)] hover:translate-y-[-1px] transition-[0.3s]">
        Export
      </button>
        </span>
    </header>
  );
}