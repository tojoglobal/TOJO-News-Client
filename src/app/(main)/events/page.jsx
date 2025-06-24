"use client";

import React from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import axios from "axios";
import PastEventsPage from "./PastEvents";
import EventSkeleton from "./EventSkeleton";

// Helper function for stripping HTML tags
function stripHtml(html = "") {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}

// Responsive description component
function DescriptionResponsive({ description }) {
  const cleanText = stripHtml(description);

  // SSR-safe check for mobile (defaults to desktop)
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Use 120 chars for mobile, 250 for desktop/tablet
  const desc =
    cleanText.length > (isMobile ? 100 : 250)
      ? cleanText.slice(0, isMobile ? 100 : 250) + "..."
      : cleanText;

  return <p className="text-royal-indigo mb-4">{desc}</p>;
}

export default function EventsPage() {
  const apiBase = process.env.NEXT_PUBLIC_API_BASE_URL;
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["allEvents"],
    queryFn: async () => {
      const url = `${apiBase}/api/admin/events`;
      const res = await axios.get(url);
      if (!Array.isArray(res?.data?.Result)) {
        console.error("API did not return an array:", res.data);
        return [];
      }
      return res?.data?.Result;
    },
  });

  // Defensive: data could be undefined/null
  const eventList = Array.isArray(data) ? data : [];

  // Sort by date (latest first), take top 3 for main events
  const latestEvents = eventList
    .filter((e) => e && e.date)
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 3);

  if (isLoading)
    return (
      <div className="container 2xl:max-w-[1370px] mx-auto py-5 mb-10 px-3 md:px-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-royal-indigo mb-4 md:mb-6">
          Events
        </h1>
        <EventSkeleton count={3} />
      </div>
    );

  if (isError)
    return (
      <div className="container 2xl:max-w-[1370px] mx-auto py-5 mb-10 px-3 md:px-0">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-royal-indigo mb-4 md:mb-6">
          Events
        </h1>
        <div className="text-gray-500">Error loading data</div>
      </div>
    );

  return (
    <div className="container 2xl:max-w-[1370px] mx-auto py-5 mb-10 px-3 md:px-0">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-royal-indigo mb-4 md:mb-6">
        Events
      </h1>
      <div className="space-y-7">
        {latestEvents.length === 0 ? (
          <div className="text-gray-500">No events found.</div>
        ) : (
          latestEvents.map((event) => (
            <div
              key={event.uuid}
              className="flex flex-col md:flex-row gap-2 md:gap-6 bg-white rounded-lg overflow-hidden transition-shadow duration-300"
            >
              <div className="md:w-1/3 h-[230px] relative">
                <Link
                  href={`/events/${event.uuid}/${encodeURIComponent(
                    event.title.replace(/\s+/g, "-").toLowerCase()
                  )}`}
                >
                  <img
                    src={`${apiBase}/Images/${event?.image_url}`}
                    className="w-full h-full rounded-lg object-cover"
                    alt={event.title}
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
                <DescriptionResponsive description={event.description} />
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
