"use client";

import { useMemo } from "react";

import { useEditorStore } from "@/store/editorStore";
import { extractHeadings } from "@/lib/extractHeadings";

export default function Sidebar() {
  const markdown = useEditorStore((state) => state.markdown);

  const headings = useMemo(() => {
    return extractHeadings(markdown);
  }, [markdown]);

  return (
    <aside className="hidden w-64 border-r border-border bg-[--foreground] p-4 lg:block">
      <div className="mb-6">
        <h2 className="text-sm font-semibold">Outline</h2>

        <p className="text-xs text-muted-foreground">
          Document structure.
        </p>
      </div>

      <div className="space-y-2">
        {headings.map((heading, index) => (
          <div
            key={index}
            style={{
              paddingLeft: `${(heading.level - 1) * 12}px`,
            }}
            className="rounded-lg px-2 py-1 text-sm text-[--text-muted] transition-colors hover:bg-accent hover:text-foreground"
          >
            - {heading.text}
          </div>
        ))}
      </div>
    </aside>
  );
}