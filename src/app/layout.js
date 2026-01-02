import GoogleAnalytics from "./components/GoogleAnalytics";
import Navbar from "./components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "FarDesigns — Branding, Packaging & Digital Design",
    template: "%s | FarDesigns",
  },
  description:
    "Helping businesses grow through branding, premium packaging design, and clean digital experiences.",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

        <GoogleAnalytics GA_MEASUREMENT_ID="G-77QF7MFC72" />

        <Navbar />
        {children}

        <a
  href="https://wa.me/917559407818?text=Hi%20I%20want%20to%20discuss%20a%20project"
  target="_blank"
  rel="noopener noreferrer"
  className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500
             flex items-center justify-center shadow-lg
             hover:scale-105 transition"
  aria-label="Chat on WhatsApp"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="white"
    className="w-7 h-7"
  >
    <path d="M16 0C7.164 0 0 7.164 0 16c0 2.82.738 5.55 2.137 7.957L0 32l8.258-2.137A15.89 15.89 0 0 0 16 32c8.836 0 16-7.164 16-16S24.836 0 16 0z"/>
  </svg>
</a>

      </body>
    </html>
  );
}
