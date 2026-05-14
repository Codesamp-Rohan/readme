"use client";

import { useEditorStore } from "@/store/editorStore";

export default function HeroBlock({ block }) {
  const updateBlock = useEditorStore((state) => state.updateBlock);

  return (
    <div className="rounded-2xl border border-border bg-secondary p-4">
      <label className="mb-2 block text-sm font-medium">
        Project Title
      </label>

      <input
        value={block.content.title}
        onChange={(e) =>
          updateBlock(block.id, {
            title: e.target.value,
          })
        }
        className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
      />

      <label className="mb-2 block text-sm font-medium">
        Description
      </label>

      <textarea
        rows={5}
        value={block.content.description}
        onChange={(e) =>
          updateBlock(block.id, {
            description: e.target.value,
          })
        }
        className="w-full rounded-xl border border-border bg-background px-4 py-3 outline-none"
      />
    </div>
  );
}