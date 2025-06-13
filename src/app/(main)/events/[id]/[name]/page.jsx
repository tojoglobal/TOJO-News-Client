"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";

export default function EventDetailPage() {
  const params = useParams();
  // params should include `id` and `name`
  const id = params?.id;

  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["event", id],
    queryFn: async () => {
      // Always use the API that returns a single event by id
      const res = await axios.get(`${apiBase}/api/admin/events/${id}`);
      // Backend returns { Status: true, Result: [...] }
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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Event not found</div>;

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-6">
        <img
          src={`${apiBase}/Images/${data.image_url}`}
          alt={data.title}
          className="w-full h-56 object-cover rounded mb-4"
          width={800}
          height={300}
          style={{ height: "auto" }}
        />
        <h1 className="text-2xl font-bold mb-2 text-royal-indigo">
          {data.title}
        </h1>
        <p className="text-gray-400 text-sm mb-2">
          {data.location} · {moment(data.date).format("dddd, MMM D, YYYY")}
        </p>
        <div className="text-gray-700 mb-4">{data.description}</div>
      </div>
    </div>
  );
}
