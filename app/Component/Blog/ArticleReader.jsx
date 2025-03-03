"use client";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useIdle } from "react-use";

export default function ArticleReader({ articleId, articleContent }) {
  const [timeSpent, setTimeSpent] = useState(0);
  const isIdle = useIdle(10000); // 10 seconds inactivity = idle
  const intervalRef = useRef(null);

  // Generate session ID and get user ID
  const sessionId = getSessionId();
  const userId = getUserId();

  useEffect(() => {
    const storedTime = localStorage.getItem(`readingTime-${articleId}`);
    if (storedTime) setTimeSpent(parseInt(storedTime, 10));

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      if (!isIdle) {
        const elapsedTime = Math.round((Date.now() - startTime) / 1000);
        setTimeSpent((prev) => {
          const newTime = prev + elapsedTime;
          localStorage.setItem(`readingTime-${articleId}`, newTime);
          return newTime;
        });
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(intervalRef.current);
  }, [isIdle]);

  useEffect(() => {
    const sendReadingTime = () => {
      if (timeSpent > 0) {
        const payload = {
          articleId,
          userId,
          sessionId,
          duration: timeSpent,
        };

        // Use navigator.sendBeacon for reliability
        if (navigator.sendBeacon) {
          const blob = new Blob([JSON.stringify(payload)], {
            type: "application/json",
          });
          navigator.sendBeacon("/api/admin/updateReadingTime", blob);
        } else {
          axios.post("/api/admin/updateReadingTime", payload);
        }

        localStorage.removeItem(`readingTime-${articleId}`);
      }
    };

    window.addEventListener("beforeunload", sendReadingTime);
    return () => window.removeEventListener("beforeunload", sendReadingTime);
  }, [timeSpent]);

  // Function to track article views
  useEffect(() => {
    axios.post("/api/admin/updateViews", { articleId, userId, sessionId });
  }, [articleId]);

  // Function to handle likes
  const handleLike = async (type) => {
    await axios.post("/api/admin/updateLikes", {
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

// Function to generate session ID (modify based on auth system)
const getSessionId = () => {
  let sessionId = localStorage.getItem("session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID(); // Generate unique ID
    localStorage.setItem("session_id", sessionId);
  }
  return sessionId;
};

const getUserId = () => {
  return localStorage.getItem("user_id") || null; // Assume user ID is stored
};
