"use client";

import { useMemo } from "react";

export function useSanitizeHtml(htmlString) {
  const DOMPurify =
    typeof window !== "undefined" ? require("dompurify")(window) : null;

  return useMemo(() => {
    if (!htmlString || !DOMPurify) return "";
    return DOMPurify.sanitize(htmlString);
  }, [htmlString, DOMPurify]);
}
