"use client";
import { useEffect, useState } from "react";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const Category = ({ category }) => {
  const axiosPublicUrl = useAxiospublic();
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPublicUrl.get(`/api/admin/newsCategory`);
        setCategories(res.data.Result || []); // Ensure we always set an array
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]); // Set empty array on error
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Show loading state
  if (isLoading) {
    return "Loading...";
  }

  // Find the category name using the ID, with proper type checking
  const categoryName = Array.isArray(categories) && categories.length > 0
    ? categories.find((cat) => cat?.ID === category)?.name || "Uncategorized"
    : "Uncategorized";

  return categoryName;
};

export default Category;
