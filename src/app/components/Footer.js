// app/components/Footer.js
"use client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <p className="text-sm">&copy; 2025 MyApp. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-400 text-sm">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-400 text-sm">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-400 text-sm">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
