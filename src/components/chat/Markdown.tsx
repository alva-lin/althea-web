import { useState, useEffect } from "react";
import { marked } from "marked";
import hljs from "highlight.js";

// 这里可以根据需要设置 highlight.js 的样式
import "highlight.js/styles/atom-one-light.css";

marked.use({
  highlight: function (code, _) {
    return hljs.highlightAuto(code).value;
  },
});

export interface MarkdownProps {
  content: string;
}

const Markdown = ({ content }: MarkdownProps) => {
  const [html, setHtml] = useState("");

  useEffect(() => {
    setHtml(marked(content));
  }, [content]);

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Markdown;
