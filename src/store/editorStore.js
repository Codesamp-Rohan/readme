import { create } from "zustand";

export const useEditorStore = create((set) => ({
  markdown: `# ReadMD

Create beautiful README files.

## Features

- Live Preview
- Markdown Support
- Beautiful UI
`,

  setMarkdown: (markdown) =>
    set({
      markdown,
    }),
}));