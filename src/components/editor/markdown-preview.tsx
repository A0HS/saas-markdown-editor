"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

interface MarkdownPreviewProps {
  content: string;
  fontSize: number;
  fontFamily: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  onScroll: (ratio: number) => void;
}

export function MarkdownPreview({
  content,
  fontSize,
  fontFamily,
  scrollRef,
  onScroll,
}: MarkdownPreviewProps) {
  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollHeight - el.clientHeight;
    if (maxScroll <= 0) return;
    onScroll(el.scrollTop / maxScroll);
  };

  return (
    <div
      ref={scrollRef}
      onScroll={handleScroll}
      className="h-full overflow-auto p-6 hide-scrollbar"
    >
      <article
        className="prose prose-neutral dark:prose-invert max-w-none prose-headings:scroll-mt-4 prose-pre:bg-muted prose-code:before:content-none prose-code:after:content-none prose-li:text-foreground"
        style={{ fontSize: `${fontSize}px`, fontFamily }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            a: ({ children, ...props }) => (
              <a {...props} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {content}
        </ReactMarkdown>
      </article>
    </div>
  );
}
