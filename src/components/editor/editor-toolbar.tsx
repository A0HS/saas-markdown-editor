"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useDownload } from "@/hooks/use-download";

const FONT_SIZES = Array.from({ length: 13 }, (_, i) => i + 8); // 8~20

export const FONT_OPTIONS = [
  { label: "Noto Sans KR", value: "var(--font-noto-sans-kr)" },
  { label: "Nanum Gothic", value: "var(--font-nanum-gothic)" },
  { label: "Nanum Myeongjo", value: "var(--font-nanum-myeongjo)" },
  { label: "Geist", value: "var(--font-geist-sans)" },
  { label: "Monospace", value: "var(--font-geist-mono), monospace" },
] as const;

interface EditorToolbarProps {
  content: string;
  onContentChange: (content: string) => void;
  fontSize: number;
  onFontSizeChange: (size: number) => void;
  fontFamily: string;
  onFontFamilyChange: (font: string) => void;
}

export function EditorToolbar({ content, onContentChange, fontSize, onFontSizeChange, fontFamily, onFontFamilyChange }: EditorToolbarProps) {
  const { download } = useDownload();

  const handleRemoveBlankLines = () => {
    const cleaned = content
      .split("\n")
      .filter((line) => line.trim() !== "")
      .join("\n");
    onContentChange(cleaned);
  };

  return (
    <header className="flex h-12 shrink-0 items-center justify-between border-b px-4">
      <div className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-primary"
        >
          <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
        </svg>
        <h1 className="text-sm font-semibold">한국GPT협회 Markdown Editor</h1>
      </div>

      <div className="flex items-center gap-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <select
              value={fontFamily}
              onChange={(e) => onFontFamilyChange(e.target.value)}
              className="h-8 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {FONT_OPTIONS.map((font) => (
                <option key={font.value} value={font.value}>
                  {font.label}
                </option>
              ))}
            </select>
          </TooltipTrigger>
          <TooltipContent>Font family</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <select
              value={fontSize}
              onChange={(e) => onFontSizeChange(Number(e.target.value))}
              className="h-8 w-16 rounded-md border bg-background px-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            >
              {FONT_SIZES.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </TooltipTrigger>
          <TooltipContent>Font size</TooltipContent>
        </Tooltip>

        <div className="mx-1 h-5 w-px bg-border" />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRemoveBlankLines}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
              <span className="hidden sm:inline">Remove blank lines</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove all blank lines</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => download(content)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              <span className="hidden sm:inline">Download .md</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Download as .md file</TooltipContent>
        </Tooltip>

        <div className="mx-1 h-5 w-px bg-border" />

        <ThemeToggle />
      </div>
    </header>
  );
}
