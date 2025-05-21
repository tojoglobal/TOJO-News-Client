"use client";
import { useAxiospublic } from "@/src/app/hooks/useAxiospublic";
import { useEffect, useState, useRef } from "react";
import { useIdle } from "react-use";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";
import DOMPurify from "dompurify";

export default function ArticleReader({ articleId, articleContent, title }) {
  const axioPublicUrl = useAxiospublic();
  const [timeSpent, setTimeSpent] = useState(0);
  const isIdle = useIdle(10000);
  const lastActiveTimeRef = useRef(Date.now());
  const hasViewed = useRef(false);
  const sessionId = getSessionId();
  const userId = getUserId();

  const articleUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${articleId}/${title.replace(
          /\s+/g,
          "-"
        )}`
      : "";
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      articleUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      articleUrl
    )}&text=Check%20out%20this%20article`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      articleUrl
    )}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(articleUrl)}`,
  };
  console.log(shareLinks.facebook);

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

  const sendReadingTime = async () => {
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
  };

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
  }, [timeSpent, articleId]);

  useEffect(() => {
    if (!hasViewed.current) {
      hasViewed.current = true;
      axioPublicUrl.post("/api/updateViews", { articleId });
    }
  }, [articleId]);

  return (
    <div className="md:flex gap-4 md:px-4 py-6 max-w-7xl mx-auto">
      {/* Social Icons - Left Sticky */}
      <div className="w-[50px] md:sticky top-24 h-fit flex flex-row md:flex-col items-center gap-5">
        <a
          href={shareLinks?.facebook}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Facebook"
        >
          <FaFacebookF className="text-royal-indigo hover:scale-125 transition-transform text-xl" />
        </a>
        <a
          href={shareLinks?.twitter}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on Twitter"
        >
          <FaTwitter className="text-royal-indigo hover:scale-125 transition-transform text-xl" />
        </a>
        <a
          href={shareLinks?.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on LinkedIn"
        >
          <FaLinkedinIn className="text-royal-indigo hover:scale-125 transition-transform text-xl" />
        </a>
        <a
          href={shareLinks?.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          title="Share on WhatsApp"
        >
          <FaWhatsapp className="text-royal-indigo hover:scale-125 transition-transform text-xl" />
        </a>
      </div>

      {/* Article Content */}
      <div className="flex-1">
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(articleContent),
          }}
          className="prose max-w-none prose-base text-base md:text-lg md:text-justify leading-relaxed"
        ></div>
        <p className="mt-6 font-medium text-gray-600">
          Time Spent: {Math.floor(timeSpent / 60)} min {timeSpent % 60} sec
        </p>
      </div>
    </div>
  );
}

// Helpers
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
