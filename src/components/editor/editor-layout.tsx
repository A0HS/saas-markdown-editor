"use client";

import { useState, useRef, useCallback } from "react";
import type { ReactCodeMirrorRef } from "@uiw/react-codemirror";
import { MarkdownEditor } from "./markdown-editor";
import { MarkdownPreview } from "./markdown-preview";
import { EditorToolbar } from "./editor-toolbar";
import { Button } from "@/components/ui/button";
import { FONT_OPTIONS } from "./editor-toolbar";
import { cn } from "@/lib/utils";

const DEFAULT_CONTENT = `# 한국GPT협회 소개

**한국GPT협회**는 27년간 기술혁신 컨설팅을 이끌어온 **알앤비디파트너스**와 함께 운영되는 AI 교육 및 컨설팅 전문 기관입니다. 산업통상자원부 **지식서비스 대상**을 수상하였으며, 전국 500개 이상의 기업 및 기관과 함께하고 있습니다.

- [한국GPT협회 홈페이지](https://www.gptkorea.or.kr/)
- [온라인 교육센터](https://gptkoreaclass.com/)
- [카카오톡 커뮤니티](https://open.kakao.com/o/gyO0HNlf)

---

## 주요 교육 과정

| 과정명 | 내용 | 대상 |
|--------|------|------|
| AI 리더 교육 | AI 기술 전략 및 리더십 | 임원·팀장급 |
| 데이터 분석 | 데이터 기반 의사결정 실무 | 분석 담당자 |
| 업무 자동화 | AI를 활용한 업무 프로세스 혁신 | 전 직원 |
| ChatGPT & 생성형 AI | 생성형 AI 실무 활용 교육 | 전 직원 |
| 연구논문 작성 | AI 기반 논문 작성 기초/고급 | 연구원·대학원생 |

## 교육 실적

- **500개+** 고객사 교육 및 컨설팅 수행
- **1,700회+** 오프라인 강의 진행
- 삼성전자, 현대자동차, LG전자, KT&G, SK그룹, GS그룹 등 주요 기업 대상

> **"AI는 도구일 뿐, 핵심은 사람입니다."**
> — 한국GPT협회

## 교육 대상 분야

- [x] 연구개발 (R&D)
- [x] 기술기획
- [x] 생산 및 품질관리
- [x] 영업 및 마케팅
- [x] IT 및 데이터 분석
- [ ] 더 많은 분야 확장 중...

## 업무 자동화 교육

AI와 노코드 도구를 결합하여 **반복 업무를 자동화**하는 실전 교육입니다.

### Make / n8n 노코드 자동화

코딩 없이 워크플로우를 구축하는 방법을 배웁니다:

\`\`\`yaml
# n8n 워크플로우 예시: 일일 뉴스 요약 자동화
workflow:
  trigger: "매일 오전 9시"
  steps:
    - name: 뉴스 크롤링
      node: HTTP Request
      url: "https://news-api.example.com/headlines?country=kr"
    - name: AI 요약
      node: OpenAI
      action: "주요 뉴스 5건을 3줄로 요약"
    - name: 슬랙 전송
      node: Slack
      channel: "#morning-briefing"
      message: "{{AI 요약 결과}}"
\`\`\`

> **Make**와 **n8n**은 드래그 앤 드롭만으로 복잡한 업무 흐름을 자동화할 수 있는 노코드 플랫폼입니다.

### 뉴스 크롤링 & 모니터링

경쟁사 동향, 산업 트렌드를 자동으로 수집·분석하는 시스템을 구축합니다:

\`\`\`python
# AI 기반 뉴스 모니터링 파이프라인
pipeline = {
    "수집": "RSS 피드 + 웹 크롤링 → 원본 데이터",
    "분석": "GPT 요약 + 감성 분석 → 인사이트 추출",
    "배포": "슬랙/이메일/대시보드 → 의사결정자 전달"
}

for step, description in pipeline.items():
    print(f"[{step}] {description}")
\`\`\`

### 영업·마케팅 효율화

AI를 활용하여 영업과 마케팅 성과를 극대화하는 방법을 학습합니다:

| 활용 영역 | AI 적용 사례 | 기대 효과 |
|-----------|-------------|-----------|
| 리드 발굴 | 고객 데이터 분석으로 잠재 고객 자동 식별 | 영업 타겟 정확도 **40%↑** |
| 콘텐츠 제작 | 블로그·SNS·광고 카피 자동 생성 | 제작 시간 **70%↓** |
| 고객 응대 | AI 챗봇 + FAQ 자동 응답 시스템 | 응답 속도 **5배↑** |
| 시장 분석 | 뉴스·리뷰 크롤링 기반 트렌드 분석 | 리포트 작성 **80%↓** |
| 이메일 캠페인 | 고객 세그먼트별 개인화 메시지 생성 | 오픈율 **2배↑** |

\`\`\`json
{
  "자동화_워크플로우": {
    "트리거": "신규 리드 등록 (CRM)",
    "단계": [
      "고객 정보 분석 → 세그먼트 분류",
      "맞춤형 이메일 템플릿 자동 생성",
      "A/B 테스트 자동 실행",
      "성과 리포트 슬랙 알림"
    ],
    "도구": ["Make", "n8n", "ChatGPT API", "Google Sheets"]
  }
}
\`\`\`

## 수강 후기

아래는 실제 수강생들의 후기 일부입니다:

1. *"실무에 바로 적용할 수 있어서 좋았습니다."* — 삼성전자
2. *"ChatGPT를 업무에 어떻게 쓸지 감이 잡혔습니다."* — 현대자동차
3. *"우리 팀 전원이 수강했고, 업무 효율이 크게 올랐습니다."* — SK그룹

## 연락처

| 항목 | 내용 |
|------|------|
| **주소** | 용인시 기흥구 기흥로 58 SKV1 B동 811호 |
| **홈페이지** | [kgpt.or.kr](https://kgpt.or.kr/) |
| **교육센터** | [gptkoreaclass.com](https://gptkoreaclass.com/) |

---

> 한국GPT협회는 AI 시대를 선도하는 교육과 컨설팅으로 기업과 기관의 **디지털 전환**을 지원합니다.

\`© 2024 한국GPT협회. All rights reserved.\`
`;

export function EditorLayout() {
  const [content, setContent] = useState(DEFAULT_CONTENT);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");
  const [fontSize, setFontSize] = useState(12);
  const [fontFamily, setFontFamily] = useState<string>(FONT_OPTIONS[0].value);

  // Scroll sync refs
  const editorRef = useRef<ReactCodeMirrorRef | null>(null);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const scrollSourceRef = useRef<"editor" | "preview" | null>(null);

  const handleEditorScroll = useCallback((ratio: number) => {
    if (scrollSourceRef.current === "preview") return;
    scrollSourceRef.current = "editor";
    const el = previewRef.current;
    if (el) {
      const maxScroll = el.scrollHeight - el.clientHeight;
      el.scrollTop = ratio * maxScroll;
    }
    requestAnimationFrame(() => {
      scrollSourceRef.current = null;
    });
  }, []);

  const handlePreviewScroll = useCallback((ratio: number) => {
    if (scrollSourceRef.current === "editor") return;
    scrollSourceRef.current = "preview";
    const view = editorRef.current?.view;
    if (view) {
      const dom = view.scrollDOM;
      const maxScroll = dom.scrollHeight - dom.clientHeight;
      dom.scrollTop = ratio * maxScroll;
    }
    requestAnimationFrame(() => {
      scrollSourceRef.current = null;
    });
  }, []);

  return (
    <div className="flex h-screen flex-col">
      <EditorToolbar
        content={content}
        onContentChange={setContent}
        fontSize={fontSize}
        onFontSizeChange={setFontSize}
        fontFamily={fontFamily}
        onFontFamilyChange={setFontFamily}
      />

      {/* Mobile tab switcher */}
      <div className="flex shrink-0 border-b md:hidden">
        <Button
          variant="ghost"
          className={cn(
            "flex-1 rounded-none border-b-2",
            activeTab === "editor"
              ? "border-primary"
              : "border-transparent text-muted-foreground"
          )}
          onClick={() => setActiveTab("editor")}
        >
          Editor
        </Button>
        <Button
          variant="ghost"
          className={cn(
            "flex-1 rounded-none border-b-2",
            activeTab === "preview"
              ? "border-primary"
              : "border-transparent text-muted-foreground"
          )}
          onClick={() => setActiveTab("preview")}
        >
          Preview
        </Button>
      </div>

      {/* Desktop: side by side | Mobile: tab-based */}
      <div className="flex min-h-0 flex-1">
        {/* Editor pane */}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-hidden border-r",
            activeTab !== "editor" && "hidden md:block"
          )}
        >
          <MarkdownEditor
            value={content}
            onChange={setContent}
            fontSize={fontSize}
            fontFamily={fontFamily}
            editorRef={editorRef}
            onScroll={handleEditorScroll}
          />
        </div>

        {/* Preview pane */}
        <div
          className={cn(
            "min-h-0 flex-1 overflow-hidden",
            activeTab !== "preview" && "hidden md:block"
          )}
        >
          <MarkdownPreview
            content={content}
            fontSize={fontSize}
            fontFamily={fontFamily}
            scrollRef={previewRef}
            onScroll={handlePreviewScroll}
          />
        </div>
      </div>
    </div>
  );
}
