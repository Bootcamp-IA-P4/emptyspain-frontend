// app/components/Navbar.js
"use client";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="bg-gray-900 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-lg font-semibold">
          <Link href="/" className="hover:text-gray-400">
            Empty Spain Project
          </Link>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          {!user ? (
            <>
              <Link href="/login" className="hover:text-gray-400">
                Log in
              </Link>
              <Link href="/register" className="hover:text-gray-400">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link href="/profile" className="hover:text-gray-400">
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
              >
                Log out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
