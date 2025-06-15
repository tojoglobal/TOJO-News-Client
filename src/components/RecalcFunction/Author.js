"use client";

import { useQuery } from "@tanstack/react-query";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const fetchAuthors = async (axiosPublicUrl) => {
  const response = await axiosPublicUrl.get("/api/authors");
  // Defensive: supports both "authors" and "result" keys
  if (response.data?.success && Array.isArray(response.data.authors))
    return response.data.authors;
  if (Array.isArray(response.data.result)) return response.data.result;
  return [];
};

const Author = ({ author1, author2, showSingle = false }) => {
  const axiosPublicUrl = useAxiospublic();

  // Only fetch if at least one author is provided
  const shouldFetch = !!author1 || !!author2;

  const {
    data: authors = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["authors"],
    queryFn: () => fetchAuthors(axiosPublicUrl),
    enabled: shouldFetch,
  });

  if (!shouldFetch) return null;

  if (isLoading) return <span>Loading authors...</span>;
  if (isError) return <span>Unknown author</span>;

  // Filter authors based on IDs
  const selectedAuthors = authors.filter(
    (author) => author.ID === author1 || author.ID === author2
  );

  if (selectedAuthors.length === 0) return null;

  const displayedAuthors = showSingle
    ? [selectedAuthors[0]?.name]
    : selectedAuthors.map((author) => author?.name);

  return displayedAuthors.join(" & ");
};

export default Author;
