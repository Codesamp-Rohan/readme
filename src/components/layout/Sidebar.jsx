"use client";

import { useMemo } from "react";

import { useEditorStore } from "@/store/editorStore";
import { extractHeadings } from "@/lib/extractHeadings";

export default function Sidebar() {
  const markdown = useEditorStore((state) => state.markdown);
  const filename = useEditorStore((state) => state.filename);
  const setFilename = useEditorStore((state) => state.setFilename)

  const headings = useMemo(() => {
    return extractHeadings(markdown);
  }, [markdown]);
    const { tree } = useMemo(() => extractHeadings(markdown), [markdown]);

    return (
    <aside className="hidden w-64 border-r border-[var(--border)] bg-[--foreground] p-4 lg:block">
      <div className="mb-6">
          <input placeholder="file name..." value={filename} onChange={(e) => setFilename(e.target.value)} className="bg-transparent rounded-lg text-[--text-primary] text-[20px] text-bold outline-[--ring] w-full"/>
      </div>
        <div className="sidebar-content">
            {tree.map((heading, index) => (
                <HeadingItem key={index} heading={heading} />
            ))}
        </div>
    </aside>
  );
}

function HeadingItem({ heading }) {
    return (
        <div className="space-y-2">
            <div
                style={{
                    paddingLeft: `${(heading.level - 1) * 4}px`,
                }}
                className="rounded-lg px-2 py-1 text-sm text-[--text-muted] transition-colors hover:bg-[var(--dark-foreground)] hover:text-foreground truncate cursor-pointer"
            >
                - {heading.text}
            </div>
            {heading.children.length > 0 && (
                <div className="rounded-lg px-2 py-1 text-sm text-[--text-muted] transition-colors mt-0-important">
                    {heading.children.map((child, index) => (
                        <HeadingItem key={index} heading={child} />
                    ))}
                </div>
            )}
        </div>
    )
}