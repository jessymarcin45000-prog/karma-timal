import React from "react";

/**
 * SafeMarkup — render a strict, allow-listed subset of inline markup without
 * ever calling `dangerouslySetInnerHTML`.
 *
 * Allowed tags
 *   <em>text</em>
 *   <strong>text</strong>
 *   <br />
 *
 * Anything else (script, img, on*= handlers, etc.) is rendered as plain text.
 * Also decodes the common HTML entity `&apos;` to a real apostrophe so that
 * existing copy doesn't need to be rewritten.
 */

type Token =
  | { kind: "text"; value: string }
  | { kind: "em"; value: string }
  | { kind: "strong"; value: string }
  | { kind: "br" };

const TAG_RE = /<\s*(em|strong)\s*>(.*?)<\s*\/\s*\1\s*>|<\s*br\s*\/?\s*>/gi;

function decodeEntities(s: string): string {
  return s
    .replace(/&apos;/g, "’")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    // Do NOT decode &lt; or &gt; — keeps suspicious input visible as text.
    ;
}

function tokenize(input: string): Token[] {
  const out: Token[] = [];
  let last = 0;
  for (const m of input.matchAll(TAG_RE)) {
    const start = m.index ?? 0;
    if (start > last) out.push({ kind: "text", value: decodeEntities(input.slice(last, start)) });
    if (m[0].toLowerCase().startsWith("<br")) {
      out.push({ kind: "br" });
    } else if (m[1].toLowerCase() === "em") {
      out.push({ kind: "em", value: decodeEntities(m[2]) });
    } else {
      out.push({ kind: "strong", value: decodeEntities(m[2]) });
    }
    last = start + m[0].length;
  }
  if (last < input.length) out.push({ kind: "text", value: decodeEntities(input.slice(last)) });
  return out;
}

export interface SafeMarkupProps {
  children: string;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function SafeMarkup({ children, as: Tag = "span", className }: SafeMarkupProps) {
  const tokens = React.useMemo(() => tokenize(children), [children]);
  return (
    <Tag className={className}>
      {tokens.map((t, i) => {
        if (t.kind === "br") return <br key={i} />;
        if (t.kind === "em") return <em key={i}>{t.value}</em>;
        if (t.kind === "strong") return <strong key={i}>{t.value}</strong>;
        return <React.Fragment key={i}>{t.value}</React.Fragment>;
      })}
    </Tag>
  );
}
