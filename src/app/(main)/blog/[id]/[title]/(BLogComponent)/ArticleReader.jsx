"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { useIdle } from "react-use";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
  FaShareAlt,
} from "react-icons/fa";
// import DOMPurify from "dompurify";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { useSanitizeHtml } from "@/src/components/hooks/useSanitizeHtml";

export default function ArticleReader({ articleId, articleContent, title }) {
  const axioPublicUrl = useAxiospublic();
  const [timeSpent, setTimeSpent] = useState(0);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const isIdle = useIdle(10000);
  const lastActiveTimeRef = useRef(Date.now());
  const hasViewed = useRef(false);
  const sessionId = getSessionId();
  const userId = getUserId();
  const shareButtonRef = useRef(null);

  const articleUrl = getArticleUrl(articleId, title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      articleUrl
    )}&text=${encodeURIComponent(`Check out this article: ${title}`)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      articleUrl
    )}&title=${encodeURIComponent(title)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(
      `${title} - ${articleUrl}`
    )}`,
  };

  // Track reading time
  useEffect(() => {
    const storedTime = localStorage.getItem(`readingTime-${articleId}`);
    if (storedTime) setTimeSpent(parseInt(storedTime, 10));

    const interval = setInterval(() => {
      if (!isIdle) {
        const now = Date.now();
        const elapsedTime = Math.round(
          (now - lastActiveTimeRef.current) / 1000
        );
        lastActiveTimeRef.current = now;

        setTimeSpent((prev) => {
          const newTime = prev + elapsedTime;
          localStorage.setItem(`readingTime-${articleId}`, newTime);
          return newTime;
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isIdle, articleId]);

  // Send reading time to server
  const sendReadingTime = useCallback(async () => {
    const storedTime = localStorage.getItem(`readingTime-${articleId}`);
    const totalReadingTime = storedTime ? parseInt(storedTime, 10) : 0;
    const readingTimeInMinutes = Math.floor(totalReadingTime / 60);

    if (readingTimeInMinutes >= 1) {
      const payload = { articleId, duration: readingTimeInMinutes };
      try {
        await axioPublicUrl.post("/api/updatereadingtime", payload);
        localStorage.removeItem(`readingTime-${articleId}`);
      } catch (error) {
        console.error("Failed to send reading time:", error);
      }
    }
  }, [timeSpent, articleId, axioPublicUrl]);

  // Handle visibility changes and unload
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) sendReadingTime();
    };

    window.addEventListener("beforeunload", sendReadingTime);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      window.removeEventListener("beforeunload", sendReadingTime);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [sendReadingTime]);

  // Track article view
  useEffect(() => {
    if (!hasViewed.current) {
      hasViewed.current = true;
      axioPublicUrl.post("/api/updateViews", { articleId });
    }
  }, [articleId, axioPublicUrl]);

  // Handle click outside share tooltip
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shareButtonRef.current &&
        !shareButtonRef.current.contains(event.target)
      ) {
        setShowShareTooltip(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleShareTooltip = () => setShowShareTooltip(!showShareTooltip);

  const formatReadingTime = () => {
    const minutes = Math.floor(timeSpent / 60);
    const seconds = timeSpent % 60;
    return `${minutes > 0 ? `${minutes} min ` : ""}${seconds} sec`;
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Article Content */}
      {/* <article className="prose prose-lg prose-override max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(articleContent),
          }}
          className="leading-relaxed"
        />
      </article> */}
      <div className="text-gray-700 mb-3">
        <article className="prose prose-lg prose-override max-w-none leading-relaxed text-gray-800">
          <div
            dangerouslySetInnerHTML={{
              __html: useSanitizeHtml(articleContent),
            }}
          />
        </article>
      </div>
      {/* Article Footer */}
      <div className="mt-6 border-t border-gray-200 pt-6 flex flex-col sm:flex-row justify-between items-center">
        {/* Reading Time */}
        <div className="text-sm text-gray-500 mb-4 sm:mb-0">
          Reading time: {formatReadingTime()}
        </div>

        {/* Share Buttons */}
        <div className="relative" ref={shareButtonRef}>
          <button
            onClick={toggleShareTooltip}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors"
            aria-label="Share article"
          >
            <FaShareAlt />
            <span>Share</span>
          </button>
          {showShareTooltip && (
            <div className="absolute bottom-full right-0 mb-3 bg-white shadow-lg rounded-lg p-3 w-48 z-10">
              <div className="flex justify-between">
                <a
                  href={shareLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  title="Share on Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href={shareLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-400 hover:bg-blue-50 rounded-full"
                  title="Share on Twitter"
                >
                  <FaTwitter />
                </a>
                <a
                  href={shareLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-blue-700 hover:bg-blue-50 rounded-full"
                  title="Share on LinkedIn"
                >
                  <FaLinkedinIn />
                </a>
                <a
                  href={shareLinks.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-green-500 hover:bg-blue-50 rounded-full"
                  title="Share on WhatsApp"
                >
                  <FaWhatsapp />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Helper functions
const getSessionId = () => {
  if (typeof window !== "undefined") {
    let sessionId = localStorage.getItem("session_id") || null;
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  }
  return null;
};

const getUserId = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("user_id") || null;
  }
  return null;
};

const getArticleUrl = (articleId, title) => {
  if (typeof window !== "undefined") {
    return `${window.location.origin}/blog/${articleId}/${title.replace(
      /\s+/g,
      "-"
    )}`;
  }
  return "";
};
