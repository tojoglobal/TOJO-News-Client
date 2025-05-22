"use client";
import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function RootLayout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      {children}
      <Footer />
    </QueryClientProvider>
  );
}
