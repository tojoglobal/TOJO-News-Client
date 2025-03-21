import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Header from "./Component/Header/Header";
import Footer from "./Component/Footer/Footer";
// swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import ContextProvider from "./context/AppContext";
import { ToastContainer } from "react-toastify";

//Poppins Front
const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const geistSans = Geist({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TOJO News",
  description:
    "TOJO News delivers the latest and most insightful updates on digital business, cryptocurrency, and emerging financial trends. Stay informed with real-time news, expert analyses, and in-depth reports on blockchain, fintech, and the evolving digital economy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <ContextProvider>
          <ToastContainer />
          <Header />
          {children}
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}
