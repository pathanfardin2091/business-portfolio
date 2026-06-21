import Link from "next/link";
import AnalyticsEvents from "./components/AnalyticsEvents";
import GoogleTagManager, {
  GoogleTagManagerNoScript,
} from "./components/GoogleTagManager";
import Navbar from "./components/Navbar";
import "./globals.css";

export const metadata = {
  title: {
    default: "FarDesigns - Branding, Packaging & Digital Design",
    template: "%s | FarDesigns",
  },
  description:
    "Helping businesses grow through branding, premium packaging design, and clean digital experiences.",
  other: {
    "p:domain_verify": "4f1520ca6a6cf1ce6c680adb6c4d5abc",
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <GoogleTagManager gtmId={GTM_ID} />
      </head>
      <body className="antialiased">
        <GoogleTagManagerNoScript gtmId={GTM_ID} />
        <AnalyticsEvents />
        <Navbar />
        {children}

        <section id="contact" className="bg-black px-6 py-28">
          <div className="mx-auto max-w-5xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Let&apos;s build a brand people remember
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
              Branding, packaging & digital design for startups and growing
              businesses. Clear communication. Clean design. Real results.
            </p>

            <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:fardesiggns@gmail.com?subject=New%20Project%20Inquiry"
                className="rounded-full bg-white px-10 py-4 text-sm font-medium text-black transition hover:bg-gray-200"
              >
                Start a project
              </a>

              <a
                href="https://api.whatsapp.com/send?phone=917559407818&text=Hi%20I%20want%20to%20discuss%20a%20project"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-green-500 px-10 py-4 text-sm font-medium text-green-400 transition hover:bg-green-500 hover:text-black"
              >
                Chat on WhatsApp
              </a>

              <Link
                href="/work"
                className="rounded-full border border-white/60 px-10 py-4 text-sm font-medium text-white transition hover:bg-white hover:text-black"
              >
                View work
              </Link>
            </div>

            <p className="mt-8 text-sm text-gray-400">
              Typically replies within 1 hour
            </p>
          </div>
        </section>

        <footer className="border-t border-gray-200 bg-white px-6 py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} FarDesign. All rights reserved.
            </p>

            <div className="flex items-center gap-6 text-sm text-gray-600">
              <Link href="/work" className="transition hover:text-black">
                Work
              </Link>
              <Link href="/#services" className="transition hover:text-black">
                Services
              </Link>
              <a
                href="mailto:fardesiggns@gmail.com"
                className="transition hover:text-black"
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
          className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105"
          aria-label="Chat on WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </body>
    </html>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-7 w-7"
      fill="currentColor"
    >
      <path d="M12.04 2C6.58 2 2.13 6.43 2.13 11.87c0 1.88.53 3.68 1.53 5.25L2 22l5.02-1.61a9.9 9.9 0 0 0 5.02 1.35c5.46 0 9.91-4.43 9.91-9.87S17.5 2 12.04 2Zm0 17.99c-1.6 0-3.16-.47-4.5-1.35l-.32-.2-2.98.95.97-2.88-.21-.33a8.02 8.02 0 0 1-1.23-4.31c0-4.48 3.71-8.13 8.27-8.13s8.27 3.65 8.27 8.13-3.71 8.12-8.27 8.12Zm4.54-6.09c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.13-.56.12-.17.25-.64.8-.79.96-.15.17-.29.18-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07s.89 2.4 1.02 2.56c.12.17 1.75 2.67 4.24 3.74.59.26 1.06.41 1.42.52.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.16-.48-.28Z" />
    </svg>
  );
}
