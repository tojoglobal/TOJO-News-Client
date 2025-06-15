"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const fetchCategories = async (axiosPublicUrl) => {
  const res = await axiosPublicUrl.get(`/api/admin/newsCategory`);
  // support both "Result" and "result"
  return res.data.Result || res.data.result || [];
};

const Category = ({ category }) => {
  const axiosPublicUrl = useAxiospublic();
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsCategories"],
    queryFn: () => fetchCategories(axiosPublicUrl),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Uncategorized";
  }

  // Find the category name using the ID, with proper type checking
  const categoryName =
    Array.isArray(categories) && categories.length > 0
      ? categories.find((cat) => cat?.ID === category)?.name || "Uncategorized"
      : "Uncategorized";

  return categoryName;
};

export default Category;
