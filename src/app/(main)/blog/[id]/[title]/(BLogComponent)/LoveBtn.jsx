"use client";
import { useContext, useState, useEffect } from "react";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import { AppContext } from "@/src/components/context/AppContext";
import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const LoveBtn = ({ articleId }) => {
  const { user } = useContext(AppContext);
  const axioPublicUrl = useAxiospublic();
  const [likes, setLikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);

  // Fetch initial likes
  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const res = await axioPublicUrl.get(
          `/api/getLove?articleId=${articleId}&userId=${user?.uid}`
        );
        setLikes(res.data.likes);
        setHasLiked(res.data.userHasLiked);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [articleId]);

  // Handle Like Click
  const handleLike = async () => {
    if (!user) {
      toast.warning("You must be signed in to like this post.");
      return;
    }

    try {
      const res = await axioPublicUrl.post("/api/updateLoves", {
        articleId,
        userId: user?.uid,
      });

      if (res.data.success) {
        setLikes((prev) => prev + (hasLiked ? -1 : 1));
        setHasLiked(!hasLiked);
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2">
      <button
        onClick={handleLike}
        className="bg-orange-500 text-white px-4 py-1 rounded-full flex items-center gap-2"
      >
        <FaHeart />
        {likes}
      </button>
    </div>
  );
};

export default LoveBtn;
