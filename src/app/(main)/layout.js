import Header from "@/src/components/Header/Header";
import Footer from "@/src/components/Footer/Footer";
export default function RootLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
