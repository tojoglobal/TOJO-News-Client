"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useAxiospublic } from "@/src/components/hooks/useAxiospublic";
import GlobalLoading from "@/src/components/GlobalLoading";
import dynamic from "next/dynamic";

export default function SponsoredDetailsPage() {
  const params = useParams();
  const id = params.id;
  const axioPublicUrl = useAxiospublic();
  const SafeHtml = dynamic(() => import("@/src/components/hooks/SafeHtml"), {
    ssr: false,
  });

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

  if (isLoading) return <GlobalLoading />;
  if (isError || !sponsored) return <div>Not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-3 md:p-5">
      <h1 className="text-2xl md:text-4xl capitalize font-bold mb-2 text-royal-indigo">
        {sponsored.title}
      </h1>
      <p className="text-gray-500 mb-3">
        Published: {moment(sponsored.published_at).format("MMM D, YYYY")}
      </p>
      <img
        src={`${axioPublicUrl.defaults.baseURL}/Images/${sponsored.image_url}`}
        alt={sponsored.title}
        className="w-full md:h-52 object-cover rounded-md md:rounded-lg mb-4"
        width={800}
        height={300}
        style={{ height: "auto" }}
      />
      <div className="text-gray-700 mb-4">
        <article className="prose prose-lg prose-override max-w-none leading-relaxed text-gray-800 mb-4">
          <SafeHtml html={sponsored.description} />
        </article>
      </div>
      <div className="flex gap-4 text-xs text-gray-500">
        <span>Start: {moment(sponsored.start_date).format("MMM D, YYYY")}</span>
        <span>End: {moment(sponsored.end_date).format("MMM D, YYYY")}</span>
      </div>
    </div>
  );
}
