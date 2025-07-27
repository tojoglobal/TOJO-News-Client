// src/app/events/[id]/[name]/page.js
import EventDetailPage from "./EventDetailPage";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/events-all`
  );

  if (!res.ok) {
    console.error("Failed to fetch sponsored data:", res.statusText);
    return [
      { id: "1", name: "example-sponsored-post" },
      { id: "2", name: "another-post" },
    ];
  }

  const data = await res.json();
  const events = data.Result || [];

  return events.map((event) => ({
    id: event.id.toString(),
    name: event.slug || event.title?.toLowerCase().replace(/\s+/g, "-"),
  }));
}

export default function Page() {
  return <EventDetailPage />;
}
