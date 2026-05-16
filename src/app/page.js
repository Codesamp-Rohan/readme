'use client'

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import EditorPane from "@/components/editor/EditorPane";
import PreviewPane from "@/components/preview/PreviewPane";
import {useRef} from "react";

export default function Home() {

    const editorRef = useRef(null)
    const previewRef = useRef(null)

    const handleEditorScroll = () => {
        const editor = editorRef.current;
        const preview = previewRef.current;

        if (!editor || !preview) return;

        const percentage =
            editor.scrollTop /
            (editor.scrollHeight - editor.clientHeight);

        preview.scrollTop =
            percentage *
            (preview.scrollHeight - preview.clientHeight);
    };


    return (
    <main className="h-screen flex overflow-hidden bg-[--background] text-foreground">
        <Sidebar />
      <div className="flex flex-col w-full h-[100dvh]">
        <Navbar />
        <div className="flex w-full h-full">
          <EditorPane editorRef={editorRef} onScroll={handleEditorScroll}/>
          <PreviewPane previewRef={previewRef} />
        </div>
      </div>
    </main>
  );
}