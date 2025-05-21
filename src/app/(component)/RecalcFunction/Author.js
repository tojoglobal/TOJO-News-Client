"use client"; // Ensure client-side rendering

import { useEffect, useState } from "react";
import { useAxiospublic } from "@/src/app/(component)/hooks/useAxiospublic";

const Author = ({ author1, author2, showSingle = false }) => {
  const axiosPublicUrl = useAxiospublic();
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!author1 && !author2) {
      setLoading(false);
      return;
    }

    axiosPublicUrl
      .get("/api/authors")
      .then((response) => {
        if (response.data.success) {
          setAuthors(response.data.authors);
        }
      })
      .catch((error) => console.error("Error fetching authors:", error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <span>Loading authors...</span>;

  // Filter authors based on IDs
  const selectedAuthors = authors.filter(
    (author) => author.ID === author1 || author.ID === author2
  );

  if (selectedAuthors.length === 0) return null;

  const displayedAuthors = showSingle
    ? [selectedAuthors[0]?.name]
    : selectedAuthors.map((author) => author?.name);

  return displayedAuthors.join("& ");
};

export default Author;
