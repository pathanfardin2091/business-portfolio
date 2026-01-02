"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo */}
    {/* const pathname = usePathname(); */}

<a
  href="/"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="text-lg font-semibold text-black select-none cursor-pointer"
>
  FarDesign
</a>


        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">

           <a href="/about" className="hover:text-black transition">
    About
  </a>

          <a href="/#services" className="hover:text-black transition">
            Services
          </a>
          <a href="work" className="hover:text-black transition">
            Work
          </a>
          <a href="#contact" className="hover:text-black transition">
            Contact
          </a>
        </nav>

        {/* Mobile Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden flex items-center justify-center w-10 h-10"
          aria-label="Toggle menu"
        >
          <span className="text-xl">☰</span>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col px-6 py-6 gap-6 text-sm text-gray-700">

 <a
    href="/about"
    onClick={() => setOpen(false)}
    className="hover:text-black transition"
  >
    About
  </a>

            <a
              href="#services"
              onClick={() => setOpen(false)}
              className="hover:text-black transition"
            >
              Services
            </a>
            <a
              href="#work"
              onClick={() => setOpen(false)}
              className="hover:text-black transition"
            >
              Work
            </a>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="hover:text-black transition"
            >
              Contact
            </a>

          
            
          </nav>
        </div>
      )}
    </header>
  );
}

