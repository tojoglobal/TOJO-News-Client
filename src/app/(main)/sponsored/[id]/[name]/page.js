import SponsoredDetailsPageClient from "./SponsoredDetailsPage";

export async function generateStaticParams() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/sponsored-all`
    );

    if (!res.ok) {
      console.error("Failed to fetch sponsored data:", res.statusText);
      return [];
    }

    const data = await res.json();
    const sponsoredItems = data.Result || [];

    return sponsoredItems.map((item) => ({
      id: item.id.toString(),
      name: item.slug || item.name?.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

// ✅ Server component that returns the Client Component
export default function Page() {
  return <SponsoredDetailsPageClient />;
}
