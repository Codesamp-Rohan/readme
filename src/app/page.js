import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import EditorPane from "@/components/editor/EditorPane";
import PreviewPane from "@/components/preview/PreviewPane";

export default function Home() {
  return (
    <main className="h-screen flex overflow-hidden bg-[--background] text-foreground">
        <Sidebar />
      <div className="flex flex-col w-full h-[100dvh]">
        <Navbar />
        <div className="flex w-full h-full">
          <EditorPane />
          <PreviewPane />
        </div>
      </div>
    </main>
  );
}