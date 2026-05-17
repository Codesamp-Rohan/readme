'use client'

import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import EditorPane from "@/components/editor/EditorPane";
import PreviewPane from "@/components/preview/PreviewPane";
import {useRef, useState} from "react";
import SettingsModal from '@/components/ui/SettingsModal'
import {useEditorStore} from '@/store/editorStore'

export default function Home() {
    const showSettings = useEditorStore((state) => state.showSettings)
    const setShowSettings = useEditorStore((state) => state.setShowSettings)
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
          {showSettings && (
              <SettingsModal onClose={() => setShowSettings(false)} />
          )}
        <div className="flex w-full h-full">
          <EditorPane editorRef={editorRef} onScroll={handleEditorScroll}/>
          <PreviewPane previewRef={previewRef} />
        </div>
      </div>
    </main>
  );
}