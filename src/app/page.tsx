"use client";

import dynamic from "next/dynamic";

const EditorLayout = dynamic(
  () =>
    import("@/components/editor/editor-layout").then(
      (mod) => mod.EditorLayout
    ),
  { ssr: false }
);

export default function Home() {
  return <EditorLayout />;
}
