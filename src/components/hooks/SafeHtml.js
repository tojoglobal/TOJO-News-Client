"use client";

import DOMPurify from "dompurify";
export default function SafeHtml({ html }) {
  if (!html) return null;
  const cleanHtml = DOMPurify.sanitize(html);

  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
}
