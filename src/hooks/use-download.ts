"use client";

import { useCallback } from "react";

function extractFileName(content: string): string {
  const firstLine = content.split("\n").find((line) => line.trim() !== "");
  if (!firstLine) return "untitled";

  // Remove markdown heading symbols and trim
  let name = firstLine.replace(/^#+\s*/, "").trim();

  // Remove characters not allowed in filenames
  name = name.replace(/[<>:"/\\|?*]/g, "").trim();

  return name || "untitled";
}

export function useDownload() {
  const download = useCallback((content: string) => {
    const fileName = extractFileName(content) + ".md";
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return { download };
}
