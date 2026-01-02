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

        
{/* CTA / CONTACT */}
<section id="contact" className="bg-black px-6 py-28">
  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
      Let’s build a brand people remember
    </h2>

    <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-300">
      Branding, packaging & digital design for startups and growing businesses.
      Clear communication. Clean design. Real results.
    </p>

    <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
      
      {/* Primary CTA */}
      <a
        href="mailto:fardesiggns@gmail.com?subject=New%20Project%20Inquiry"
        className="px-10 py-4 rounded-full bg-white text-black text-sm font-medium
                   hover:bg-gray-200 transition"
      >
        Start a project
      </a>


      {/* WhatsApp CTA */}
  <a
    href="https://api.whatsapp.com/send?phone=917559407818&text=Hi%20I%20want%20to%20discuss%20a%20project"
    target="_blank"
    rel="noopener noreferrer"
    className="px-10 py-4 rounded-full border border-green-500 text-green-400
               text-sm font-medium hover:bg-green-500 hover:text-black transition"
  >
    Chat on WhatsApp
  </a>

      {/* Secondary CTA */}
      <a
        href="/work"
        className="px-10 py-4 rounded-full border border-white/60 text-white
                   text-sm font-medium hover:bg-white hover:text-black transition"
      >
        View work
      </a>

    </div>

    {/* Trust line */}
    <p className="mt-8 text-sm text-gray-400">
      Typically replies within 1 hours
    </p>

  </div>
</section>


{/* FOOTER */}
<footer className="bg-white px-6 py-16 border-t border-gray-200">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
    
    {/* Left */}
    <p className="text-sm text-gray-500">
      © {new Date().getFullYear()} YourBrand. All rights reserved.
    </p>

    {/* Right */}
    <div className="flex items-center gap-6 text-sm text-gray-600">
      <a href="/work" className="hover:text-black transition">
        Work
      </a>
      <a href="#services" className="hover:text-black transition">
        Services
      </a>
      <a
        href="mailto:fardesiggns@gmail.com"
        className="hover:text-black transition"
      >
        Contact
      </a>
    </div>

  </div>
</footer>

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
