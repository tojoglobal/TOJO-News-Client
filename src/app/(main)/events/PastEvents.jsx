const pastEvents = [
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

export default function PastEvents() {
  return (
    <div>
      {/* Past Events Section */}
      <h2 className="text-2xl md:text-3xl font-bold text-royal-indigo mt-16 mb-8">
        Past Events
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pastEvents.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="h-[200px] relative">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <div className="text-sm text-gray-600 mb-2">
                {event.location} · {event.date}
              </div>
              <h3 className="text-lg font-bold text-royal-indigo mb-2">
                {event.title}
              </h3>
              <p className="text-sm text-gray-700">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
