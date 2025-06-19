"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";

/**
 * Format the event description:
 * - Add a gap (double <br/>) after every period that ends a sentence.
 * - Add a gap (double <br/>) after every ~200 visible characters (but don't break HTML tags).
 */
function formatDescription(desc) {
  if (!desc) return "";

  // Add line break after each period + space (end of sentence)
  let withDotBreaks = desc.replace(/\. +/g, ".<br /><br />");

  // Insert a break every 200 visible characters, skipping HTML tags
  let result = "";
  let count = 0;
  let inTag = false;
  for (let i = 0; i < withDotBreaks.length; i++) {
    let char = withDotBreaks[i];
    if (char === "<") inTag = true;
    if (char === ">") inTag = false;

    if (!inTag && count >= 500 && char !== "<") {
      result += "<br /><br />";
      count = 0;
    }
    result += char;
    if (!inTag) count++;
  }

  return result;
}

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

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Event not found</div>;

  return (
    <div className="container mx-auto">
      <div className="max-w-3xl mx-auto bg-white rounded shadow p-3 md:p-6">
        <img
          src={`${apiBase}/Images/${data.image_url}`}
          alt={data.title}
          className="w-full h-56 object-cover rounded-md md:rounded-lg mb-4"
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
        <article className="prose prose-lg prose-override max-w-none">
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(formatDescription(data.description)),
            }}
            className="leading-relaxed"
          />
        </article>
      </div>
    </div>
  );
}
