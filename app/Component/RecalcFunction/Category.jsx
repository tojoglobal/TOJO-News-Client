"use client";
import React, { useEffect, useState } from "react";
import { useAxiospublic } from "@/app/hooks/useAxiospublic";

const Category = ({ category }) => {
  const axiosPublicUrl = useAxiospublic();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosPublicUrl.get(`/api/admin/newsCategory`);
        setCategories(res.data.Result);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Find the category name using the ID
  const categoryName =
    categories.find((cat) => cat.ID === category)?.name || "Crypto";

  return categoryName;
};

export default Category;
