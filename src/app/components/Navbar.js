"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/about", label: "About" },
  { href: "/#services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/#contact", label: "Contact" },
  { href: "/video", label: "Video" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="select-none text-lg font-semibold text-black"
        >
          FarDesign
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-gray-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((currentOpen) => !currentOpen)}
          className="flex h-10 w-10 items-center justify-center md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className="h-0.5 w-full bg-black" />
            <span className="h-0.5 w-full bg-black" />
            <span className="h-0.5 w-full bg-black" />
          </span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <nav className="flex flex-col gap-6 px-6 py-6 text-sm text-gray-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="transition hover:text-black"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
