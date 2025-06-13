"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";

export default function SponsoredDetailsPage() {
  const params = useParams();
  const id = params.id;
  const axioPublicUrl = useAxiospublic();

  const {
    data: sponsored,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sponsoredDetails", id],
    queryFn: async () => {
      const res = await axioPublicUrl.get(`/api/admin/Sponsoredbyid/${id}`);
      // API should return single object in Result[0]
      return res.data.Result?.[0];
    },
    enabled: !!id,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !sponsored) return <div>Not found</div>;

  return (
    <div className="container mx-auto py-5">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <img
          src={`${axioPublicUrl.defaults.baseURL}/Images/${sponsored.image_url}`}
          alt={sponsored.title}
          className="w-full h-72 object-cover rounded mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-royal-indigo">
          {sponsored.title}
        </h1>
        <p className="text-gray-400 text-sm mb-2">
          Published: {moment(sponsored.published_at).format("MMM D, YYYY")}
        </p>
        <div className="text-gray-700 mb-4" style={{ whiteSpace: "pre-line" }}>
          {sponsored.description}
        </div>
        <div className="flex gap-4 text-xs text-gray-500">
          <span>
            Start: {moment(sponsored.start_date).format("MMM D, YYYY")}
          </span>
          <span>End: {moment(sponsored.end_date).format("MMM D, YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
