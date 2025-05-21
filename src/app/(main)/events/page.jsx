"use client";

import PastEvents from "./PastEvents";

const upcomingEvents = [
  {
    id: 1,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    location: "Javits Center North | 445 11th Ave",
    date: "Tues - Thurs, March 18 - 20, 2025",
    title: "Digital Asset Summit 2025 - New York",
    description:
      "Digital Asset Summit (DAS) will feature conversations between the builders, allocators, and legislators who will shape the trajectory of the digital asset ecosystem in the US and abroad.",
  },
  {
    id: 2,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    location: "Javits Center North | 445 11th Ave",
    date: "Tues - Thurs, March 18 - 20, 2025",
    title: "Digital Asset Summit 2025 - New York",
    description:
      "Digital Asset Summit (DAS) will feature conversations between the builders, allocators, and legislators who will shape the trajectory of the digital asset ecosystem in the US and abroad.",
  },
  {
    id: 3,
    image:
      "https://blockworks-co.imgix.net/wp-content/uploads/2025/01/DAS2025_London_thumbnail.png",
    location: "Javits Center North | 445 11th Ave",
    date: "Tues - Thurs, March 18 - 20, 2025",
    title: "Digital Asset Summit 2025 - New York",
    description:
      "Digital Asset Summit (DAS) will feature conversations between the builders, allocators, and legislators who will shape the trajectory of the digital asset ecosystem in the US and abroad.",
  },
];

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-5">
      {/* Upcoming Events Section */}
      <h1 className="text-3xl font-bold text-royal-indigo mb-8">Events</h1>
      <div className="space-y-6">
        {upcomingEvents.map((event) => (
          <div key={event.id} className="flex flex-col md:flex-row gap-6 bg-white rounded-lg overflow-hidden transition-shadow duration-300">
            <div className="md:w-1/3 h-[250px] relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
            <div className="md:w-2/3 p-6">
              <div className="text-sm text-gray-600 mb-2">
                {event.location} · {event.date}
              </div>
              <h2 className="text-xl font-bold text-royal-indigo mb-3">
                {event.title}
              </h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
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
        ))}
      </div>
      <PastEvents />
    </div>
  );
}
