"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import axios from "axios";

export default function PastEventsPage() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/events`
      );
      return res?.data?.Result || [];
    },
  });
  
  // Sort by date (latest first), skip top 3 (rest are past events)
  const pastEvents = [...data]
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(3);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div>
      <h2 className="text-2xl md:text-3xl lg:text-4xl mx-3 md:mx-0 font-bold text-royal-indigo mt-16 mb-8">
        Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mx-3 md:mx-0">
        {pastEvents.length === 0 && (
          <div className="col-span-full text-gray-500">No past events.</div>
        )}
        {pastEvents?.map((event) => (
          <div
            key={event.uuid}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-[200px] relative">
              <Link
                href={`/events/${event.uuid}/${encodeURIComponent(
                  event.title.replace(/\s+/g, "-").toLowerCase()
                )}`}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/Images/${event.image_url}`}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>
            <div className="p-3 md:p-4">
              <div className="text-sm text-gray-600 mb-2">
                {event.location} ·{" "}
                {moment(event.date).format("dddd, MMM D, YYYY")}
              </div>
              <Link
                href={`/events/${event.uuid}/${encodeURIComponent(
                  event.title.replace(/\s+/g, "-").toLowerCase()
                )}`}
              >
                <h3 className="text-lg hover:underline font-bold text-royal-indigo mb-2">
                  {event.title}
                </h3>
              </Link>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
