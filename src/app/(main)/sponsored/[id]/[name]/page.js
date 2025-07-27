import SponsoredDetailsPageClient from "./SponsoredDetailsPage";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/sponsored-all`
  );
  const data = await res.json();
  const sponsoredItems = data.Result || [];

  return sponsoredItems.map((item) => ({
    id: item.id.toString(),
    name: item.slug || item.name?.toLowerCase().replace(/\s+/g, "-"),
  }));
}

// ✅ Server component that returns the Client Component
export default function Page() {
  return <SponsoredDetailsPageClient />;
}
