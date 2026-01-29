import { useAnimations } from "../utils/animations";

type TokenType =
  | "keyword"
  | "string"
  | "number"
  | "comment"
  | "function"
  | "variable"
  | "operator"
  | "punctuation"
  | "type"
  | "plain";

interface Token {
  type: TokenType;
  value: string;
}

interface TerminalProps {
  /** Title shown in the terminal title bar */
  title?: string;
  /** Code content - either raw string or pre-tokenized */
  code: string | Token[][];
  /** Language hint for basic auto-highlighting (if code is string) */
  language?: "javascript" | "typescript" | "python" | "bash" | "json" | "plain";
  /** Show line numbers */
  lineNumbers?: boolean;
  /** Terminal theme */
  theme?: "dark" | "darker" | "light";
  /** Animation delay in frames */
  delay?: number;
  /** Animate typing effect */
  typewriter?: boolean;
  /** Typing speed (characters per frame) */
  typeSpeed?: number;
  /** Width of the terminal */
  width?: number | string;
  /** Max height of the terminal */
  maxHeight?: number | string;
  /** Font size in pixels */
  fontSize?: number;
  /** Padding inside the code area */
  padding?: number;
  /** Additional class names */
  className?: string;
}

const tokenColors: Record<TokenType, string> = {
  keyword: "#c678dd",    // Purple
  string: "#98c379",     // Green
  number: "#d19a66",     // Orange
  comment: "#5c6370",    // Gray
  function: "#61afef",   // Blue
  variable: "#e06c75",   // Red
  operator: "#56b6c2",   // Cyan
  punctuation: "#abb2bf", // Light gray
  type: "#e5c07b",       // Yellow
  plain: "#abb2bf",      // Default text
};

const themeStyles = {
  dark: {
    background: "#282c34",
    titleBar: "#21252b",
    border: "#181a1f",
    titleText: "#9da5b4",
  },
  darker: {
    background: "#1e1e1e",
    titleBar: "#323233",
    border: "#141414",
    titleText: "#808080",
  },
  light: {
    background: "#fafafa",
    titleBar: "#e8e8e8",
    border: "#d0d0d0",
    titleText: "#666666",
  },
};

// Basic tokenizer for common languages
const tokenize = (code: string, language: string): Token[][] => {
  const lines = code.split("\n");

  const patterns: Record<string, { regex: RegExp; type: TokenType }[]> = {
    javascript: [
      { regex: /(\/\/.*$)/gm, type: "comment" },
      { regex: /(\/\*[\s\S]*?\*\/)/g, type: "comment" },
      { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|throw|new|this|typeof|instanceof)\b/g, type: "keyword" },
      { regex: /\b(true|false|null|undefined)\b/g, type: "keyword" },
      { regex: /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, type: "string" },
      { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
      { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, type: "type" },
      { regex: /\b([a-zA-Z_]\w*)\s*(?=\()/g, type: "function" },
      { regex: /([=+\-*/<>!&|?:]+)/g, type: "operator" },
      { regex: /([{}[\]();,.])/g, type: "punctuation" },
    ],
    typescript: [
      { regex: /(\/\/.*$)/gm, type: "comment" },
      { regex: /(\/\*[\s\S]*?\*\/)/g, type: "comment" },
      { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|from|default|async|await|try|catch|throw|new|this|typeof|instanceof|interface|type|enum|implements|extends|public|private|protected|readonly)\b/g, type: "keyword" },
      { regex: /\b(true|false|null|undefined)\b/g, type: "keyword" },
      { regex: /:\s*([a-zA-Z_]\w*)/g, type: "type" },
      { regex: /(["'`])(?:(?!\1)[^\\]|\\.)*?\1/g, type: "string" },
      { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
      { regex: /\b([A-Z][a-zA-Z0-9]*)\b/g, type: "type" },
      { regex: /\b([a-zA-Z_]\w*)\s*(?=\()/g, type: "function" },
      { regex: /([=+\-*/<>!&|?:]+)/g, type: "operator" },
      { regex: /([{}[\]();,.])/g, type: "punctuation" },
    ],
    python: [
      { regex: /(#.*$)/gm, type: "comment" },
      { regex: /("""[\s\S]*?"""|'''[\s\S]*?''')/g, type: "string" },
      { regex: /\b(def|class|return|if|elif|else|for|while|import|from|as|try|except|finally|raise|with|lambda|yield|pass|break|continue|and|or|not|in|is|True|False|None)\b/g, type: "keyword" },
      { regex: /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, type: "string" },
      { regex: /\b(\d+\.?\d*)\b/g, type: "number" },
      { regex: /\b([a-zA-Z_]\w*)\s*(?=\()/g, type: "function" },
      { regex: /([=+\-*/<>!&|@:]+)/g, type: "operator" },
      { regex: /([{}[\]();,.])/g, type: "punctuation" },
    ],
    bash: [
      { regex: /(#.*$)/gm, type: "comment" },
      { regex: /\b(if|then|else|elif|fi|for|while|do|done|case|esac|function|return|exit|echo|cd|ls|mkdir|rm|cp|mv|cat|grep|sed|awk|export|source)\b/g, type: "keyword" },
      { regex: /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, type: "string" },
      { regex: /(\$\w+|\$\{[^}]+\})/g, type: "variable" },
      { regex: /\b(\d+)\b/g, type: "number" },
      { regex: /([|&;<>]+)/g, type: "operator" },
    ],
    json: [
      { regex: /(["'])(?:(?!\1)[^\\]|\\.)*?\1(?=\s*:)/g, type: "variable" },
      { regex: /(["'])(?:(?!\1)[^\\]|\\.)*?\1/g, type: "string" },
      { regex: /\b(true|false|null)\b/g, type: "keyword" },
      { regex: /\b(-?\d+\.?\d*)\b/g, type: "number" },
      { regex: /([{}[\]:,])/g, type: "punctuation" },
    ],
    plain: [],
  };

  const langPatterns = patterns[language] || patterns.plain;

  return lines.map((line) => {
    if (langPatterns.length === 0) {
      return [{ type: "plain" as TokenType, value: line }];
    }

    // Simple approach: find all matches and sort by position
    const tokens: { start: number; end: number; type: TokenType; value: string }[] = [];

    for (const pattern of langPatterns) {
      const regex = new RegExp(pattern.regex.source, pattern.regex.flags);
      let match;
      while ((match = regex.exec(line)) !== null) {
        tokens.push({
          start: match.index,
          end: match.index + match[0].length,
          type: pattern.type,
          value: match[0],
        });
      }
    }

    // Sort by start position
    tokens.sort((a, b) => a.start - b.start);

    // Build final token list, filling gaps with plain text
    const result: Token[] = [];
    let pos = 0;

    for (const token of tokens) {
      if (token.start > pos) {
        result.push({ type: "plain", value: line.slice(pos, token.start) });
      }
      if (token.start >= pos) {
        result.push({ type: token.type, value: token.value });
        pos = token.end;
      }
    }

    if (pos < line.length) {
      result.push({ type: "plain", value: line.slice(pos) });
    }

    if (result.length === 0) {
      result.push({ type: "plain", value: line });
    }

    return result;
  });
};

export const Terminal: React.FC<TerminalProps> = ({
  title = "Terminal",
  code,
  language = "javascript",
  lineNumbers = false,
  theme = "dark",
  delay = 0,
  typewriter = false,
  typeSpeed = 2,
  width = 800,
  maxHeight,
  fontSize = 28,
  padding = 24,
  className = "",
}) => {
  const { fadeIn, scaleIn, frame } = useAnimations(delay);
  const themeStyle = themeStyles[theme];

  // Tokenize if code is a string
  const tokens: Token[][] = typeof code === "string"
    ? tokenize(code, language)
    : code;

  // Calculate visible characters for typewriter effect
  const totalChars = tokens.reduce(
    (sum, line) => sum + line.reduce((lineSum, token) => lineSum + token.value.length, 0) + 1,
    0
  );
  const visibleChars = typewriter
    ? Math.floor(frame * typeSpeed)
    : totalChars;

  const opacity = fadeIn(20);
  const scale = scaleIn();

  // Render tokens with typewriter effect
  let charCount = 0;
  const renderLine = (line: Token[], lineIndex: number) => {
    const lineContent: React.ReactNode[] = [];

    for (let i = 0; i < line.length; i++) {
      const token = line[i];
      const tokenStart = charCount;
      const tokenEnd = charCount + token.value.length;

      if (tokenStart >= visibleChars) {
        charCount = tokenEnd;
        continue;
      }

      const visiblePart = tokenEnd <= visibleChars
        ? token.value
        : token.value.slice(0, visibleChars - tokenStart);

      charCount = tokenEnd;

      if (visiblePart) {
        lineContent.push(
          <span key={i} style={{ color: tokenColors[token.type] }}>
            {visiblePart}
          </span>
        );
      }
    }

    charCount++; // Account for newline

    return (
      <div key={lineIndex} className="flex">
        {lineNumbers && (
          <span
            className="select-none pr-4 text-right"
            style={{
              color: themeStyle.titleText,
              minWidth: "3em",
            }}
          >
            {lineIndex + 1}
          </span>
        )}
        <span className="flex-1 whitespace-pre">{lineContent}</span>
      </div>
    );
  };

  return (
    <div
      className={`rounded-xl overflow-hidden shadow-2xl ${className}`}
      style={{
        width,
        maxHeight,
        opacity,
        transform: `scale(${scale})`,
        border: `1px solid ${themeStyle.border}`,
      }}
    >
      {/* Title bar */}
      {title && (
        <div
          className="flex items-center px-8 py-5"
          style={{
            background: themeStyle.titleBar,
            borderBottom: `1px solid ${themeStyle.border}`,
          }}
        >
          <div
            className="px-6 py-3 rounded-lg font-mono text-3xl font-semibold"
            style={{
              background: themeStyle.background,
              color: tokenColors.function,
              border: `1px solid ${themeStyle.border}`,
            }}
          >
            {title}
          </div>
        </div>
      )}

      {/* Code content */}
      <div
        className="overflow-auto font-mono leading-relaxed"
        style={{
          background: themeStyle.background,
          padding,
          fontSize,
          lineHeight: 1.6,
          maxHeight: maxHeight && title ? `calc(${typeof maxHeight === 'number' ? maxHeight + 'px' : maxHeight} - 90px)` : undefined,
        }}
      >
        {tokens.map((line, i) => renderLine(line, i))}
        {typewriter && visibleChars < totalChars && (
          <span
            className="inline-block w-2 h-5 ml-0.5 animate-pulse"
            style={{ background: tokenColors.plain }}
          />
        )}
      </div>
    </div>
  );
};
