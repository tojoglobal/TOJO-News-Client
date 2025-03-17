"use client";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";
import { useEffect, useState, useRef } from "react";
import { useIdle } from "react-use";

export default function ArticleReader({ articleId, articleContent }) {
  const axioPublicUrl = useAxiospublic();
  const [timeSpent, setTimeSpent] = useState(0);
  const isIdle = useIdle(10000);
  const lastActiveTimeRef = useRef(Date.now());
  const hasViewed = useRef(false);

  const sessionId = getSessionId();
  const userId = getUserId();

  useEffect(() => {
    // Restore previous time spent from localStorage
    const storedTime = localStorage.getItem(`readingTime-${articleId}`);
    if (storedTime) setTimeSpent(parseInt(storedTime, 10));

    // Start tracking time
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

  // Function to send reading time data when user leaves the page
  const sendReadingTime = async () => {
    if (timeSpent > 0) {
      const payload = { articleId, duration: timeSpent };
      console.log("Sending reading time:", payload);
      try {
        await axioPublicUrl.post("/api/updatereadingtime", payload);
        localStorage.removeItem(`readingTime-${articleId}`);
      } catch (error) {
        console.error("Failed to send reading time:", error);
      }
    }
  };

  // Listen for tab close or page leave
  useEffect(() => {
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) sendReadingTime();
    });
    window.addEventListener("beforeunload", sendReadingTime);

    return () => {
      document.removeEventListener("visibilitychange", sendReadingTime);
      window.removeEventListener("beforeunload", sendReadingTime);
    };
  }, [timeSpent, articleId]);

  // Track article views (only once)
  useEffect(() => {
    if (!hasViewed.current) {
      hasViewed.current = true;
      axioPublicUrl.post("/api/updateViews", { articleId });
    }
  }, [articleId]);

  // Handle likes
  const handleLike = async (type) => {
    await axioPublicUrl.post("/api/admin/updateLikes", {
      articleId,
      userId,
      likeType: type,
    });
  };

  return (
    <div>
      <p>Time Spent: {timeSpent} sec</p>
      <button onClick={() => handleLike("like")}>👍 Like</button>
      <button onClick={() => handleLike("dislike")}>👎 Dislike</button>
      <div
        dangerouslySetInnerHTML={{ __html: articleContent || "" }}
        className="mt-4 text-lg"
      />
    </div>
  );
}

// Helper functions for session and user ID
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
