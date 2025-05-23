"use client";
import { useState, useEffect } from "react";

const useApi = (endpoint, options = {}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`,
          options
        );
        if (!response.ok) throw new Error("Failed to fetch data");
        if (response.status === 200) {
          const result = await response.json();
          setData(result.Result);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, JSON.stringify(options)]);

  return { data, error, loading };
};

export default useApi;
