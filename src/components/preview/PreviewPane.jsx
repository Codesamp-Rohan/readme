"use client";

import ReactMarkdown from "react-markdown";
import { useEditorStore } from "@/store/editorStore";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function PreviewPane({ previewRef }) {
  const markdown = useEditorStore((state) => state.markdown);

  return (
    <section className="hidden w-1/2 bg-muted/30 xl:block bg-[--foreground]">
      <div ref={previewRef} className="h-full overflow-auto  h-[calc(100%-60px)]">
        <div
          className="preview-container max-w-none p-4"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}