"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useMemo, useRef, useCallback } from "react";
import CodeMirror, { type ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import { EditorView } from "@codemirror/view";
import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  bulletListMarker: "-",
});

// Preserve strikethrough
turndown.addRule("strikethrough", {
  filter: ["del", "s"],
  replacement: (content) => `~~${content}~~`,
});

function htmlToMarkdown(html: string): string {
  try {
    return turndown.turndown(html);
  } catch {
    return "";
  }
}

const pasteAsMarkdown = EditorView.domEventHandlers({
  paste(event, view) {
    const clipboard = event.clipboardData;
    if (!clipboard) return false;

    const html = clipboard.getData("text/html");
    if (!html) return false; // no HTML → let CodeMirror handle plain text

    const md = htmlToMarkdown(html);
    if (!md) return false;

    event.preventDefault();
    const { from, to } = view.state.selection.main;
    view.dispatch({
      changes: { from, to, insert: md },
      selection: { anchor: from + md.length },
    });
    return true;
  },
});

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontSize: number;
  fontFamily: string;
  editorRef: React.RefObject<ReactCodeMirrorRef | null>;
  onScroll: (ratio: number) => void;
}

export function MarkdownEditor({
  value,
  onChange,
  fontSize,
  fontFamily,
  editorRef,
  onScroll,
}: MarkdownEditorProps) {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const onScrollRef = useRef(onScroll);
  onScrollRef.current = onScroll;

  useEffect(() => {
    setMounted(true);
  }, []);

  const fontTheme = useMemo(
    () =>
      EditorView.theme({
        "&": { fontSize: `${fontSize}px`, fontFamily },
        ".cm-content": { fontSize: `${fontSize}px`, fontFamily },
        ".cm-gutters": { fontSize: `${fontSize}px` },
      }),
    [fontSize, fontFamily]
  );

  const handleCreateEditor = useCallback(
    (view: EditorView) => {
      const dom = view.scrollDOM;
      const handler = () => {
        const maxScroll = dom.scrollHeight - dom.clientHeight;
        if (maxScroll <= 0) return;
        onScrollRef.current(dom.scrollTop / maxScroll);
      };
      dom.addEventListener("scroll", handler);
    },
    []
  );

  if (!mounted) {
    return (
      <div className="flex h-full items-center justify-center text-muted-foreground">
        Loading editor...
      </div>
    );
  }

  return (
    <CodeMirror
      ref={editorRef}
      value={value}
      onChange={onChange}
      onCreateEditor={handleCreateEditor}
      theme={theme === "dark" ? "dark" : "light"}
      extensions={[
        markdown({ base: markdownLanguage, codeLanguages: languages }),
        EditorView.lineWrapping,
        fontTheme,
        pasteAsMarkdown,
      ]}
      className="h-full"
      basicSetup={{
        lineNumbers: true,
        foldGutter: true,
        highlightActiveLine: true,
        bracketMatching: true,
      }}
    />
  );
}
