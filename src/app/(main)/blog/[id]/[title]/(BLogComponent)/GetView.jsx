"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

const GetView = ({ blogId }) => {
  const axiosPublic = useAxiospublic();

  const { data, isLoading } = useQuery({
    queryKey: ["viewCount", blogId],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/api/${blogId}/view`);
      return data.viewCount || 0;
    },
    staleTime: 1000 * 60 * 5, // optional
  });

  return (
    <span className="ml-2 text-sm">
      {isLoading ? "Loading..." : `Views: ${data}`}
    </span>
  );
};

export default GetView;
