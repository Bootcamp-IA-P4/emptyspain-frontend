"use client";
import Link from "next/link";
import { useAuth } from "../../context/authContext";

export default function Navbar() {
  const { user, handleLogout } = useAuth();

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white shadow-md">
      <div className="flex gap-4">
        <Link href="/" className="hover:text-gray-300">
          Home
        </Link>
        {!user ? (
          <>
            <Link href="/login" className="hover:text-gray-300">
              Log in
            </Link>
            <Link href="/register" className="hover:text-gray-300">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
