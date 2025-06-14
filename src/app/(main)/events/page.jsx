"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import axios from "axios";
import PastEventsPage from "./PastEvents";

export default function EventsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const url = `${apiBase}/api/admin/events`;
      const res = await axios.get(url);
      console.log(res);
      if (!Array.isArray(res?.data?.Result)) {
        console.error("API did not return an array:", res.data);
        return [];
      }
      return res.data.Result;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  // Defensive: data could be undefined/null
  const eventList = Array.isArray(data) ? data : [];

  // Sort by date (latest first), take top 3 for main events
  const latestEvents = eventList
    .filter((e) => e && e.date)
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 3);

  return (
    <div className="container mx-auto py-5 mb-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center md:text-left font-bold text-royal-indigo mb-8">
        Events
      </h1>
      <div className="space-y-7 mx-3 md:mx-0">
        {latestEvents.length === 0 ? (
          <div className="text-gray-500">No events found.</div>
        ) : (
          latestEvents.map((event) => (
            <div
              key={event.uuid}
              className="flex flex-col md:flex-row gap-2 md:gap-6 bg-white rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <div className="md:w-1/3 h-[250px] relative">
                <Link
                  href={`/events/${event.uuid}/${encodeURIComponent(
                    event.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                >
                  <img
                    src={`${apiBase}/Images/${event.image_url}`}
                    alt={event.title}
                    className="w-full h-full rounded-lg object-cover"
                  />
                </Link>
              </div>
              <div className="md:w-2/3 p-2 md:p-6">
                <div className="text-sm text-gray-600 mb-2">
                  {event.location} ·{" "}
                  {moment(event.date).format("dddd, MMM D, YYYY")}
                </div>
                <Link
                  href={`/events/${event.uuid}/${encodeURIComponent(
                    event.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                >
                  <h2 className="text-xl capitalize hover:underline font-bold text-royal-indigo mb-3">
                    {event.title}
                  </h2>
                </Link>
                <p className="text-royal-indigo mb-4">
                  {event.description.slice(0, 250)}
                </p>
                <div className="flex gap-3">
                  <button className="bg-royal-indigo text-white px-6 py-2 rounded-full hover:bg-purple-700 transition-colors duration-300">
                    SUBSCRIBE
                  </button>
                  <button className="border border-royal-indigo text-royal-indigo px-6 py-2 rounded-full hover:bg-purple-50 transition-colors duration-300">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PastEventsPage />
    </div>
  );
}
