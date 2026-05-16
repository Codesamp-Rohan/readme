"use client";

import { useEditorStore } from "@/store/editorStore";

export default function EditorPane({ editorRef, onScroll }) {
  const markdown = useEditorStore((state) => state.markdown);
  const setMarkdown = useEditorStore((state) => state.setMarkdown);

  return (
    <section className="flex-1 border-r border-[var(--border)] bg-background h-[calc(100%-60px)]">
      <textarea
          ref={editorRef}
          onScroll={onScroll}
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm outline-none text-[--text-primary]"
        placeholder="Enter # for title"
        spellCheck={false}
      />
    </section>
  );
}