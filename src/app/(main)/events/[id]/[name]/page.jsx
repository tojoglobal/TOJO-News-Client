"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import GlobalLoading from "@/src/components/GlobalLoading";
import { useSanitizeHtml } from "@/src/components/hooks/useSanitizeHtml";

export default function EventDetailPage() {
  const params = useParams();
  const id = params?.id;
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      const res = await axios.get(`${apiBase}/api/admin/events/${id}`);
      if (
        res.data?.Status &&
        Array.isArray(res.data.Result) &&
        res.data.Result.length > 0
      ) {
        return res.data.Result[0];
      }
      return null;
    },
    enabled: !!id,
  });

  if (isLoading) return <GlobalLoading />;
  if (isError || !data) return <div>Event not found</div>;

  return (
    <div className="max-w-5xl mx-auto bg-white p-3 md:p-5">
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-royal-indigo">
        {data.title}
      </h1>
      <p className="text-gray-500 mb-3">
        {data.location} · {moment(data.date).format("dddd, MMM D, YYYY")}
      </p>
      <img
        src={`${apiBase}/Images/${data.image_url}`}
        alt={data.title}
        className="w-full md:h-52 object-cover rounded-md md:rounded-lg mb-4"
        width={800}
        height={300}
        style={{ height: "auto" }}
      />
      <div className="text-gray-700 mb-4">
        <article className="prose prose-lg prose-override max-w-none leading-relaxed text-gray-800 mb-4">
          <div
            dangerouslySetInnerHTML={{
              __html: useSanitizeHtml(data.description),
            }}
          />
        </article>
      </div>
    </div>
  );
}
