// app/layout.js
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ContextProvider from "../components/context/AppContext";
import { Toaster } from "react-hot-toast";

// Reuse your font definitions
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
        className={`${poppins.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <ContextProvider>
          {children}
          <Toaster />
        </ContextProvider>
      </body>
    </html>
  );
}
