"use client";
import Link from "next/link";
import { useAuth } from "../../context/authContext";
import { HomeIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const { user, handleLogout } = useAuth();

  const linkClasses = "text-white hover:text-gray-300 transition-colors px-3 py-2 rounded-md";

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        <HomeIcon className="h-6 w-6 text-white" />
        <Link href="/" className={`${linkClasses} text-xl font-bold`}>
          España Vaciada
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/" className={linkClasses}>
          Home
        </Link>
        {!user ? (
          <>
            <Link href="/login" className={linkClasses}>
              Log in
            </Link>
            <Link href="/register" className={linkClasses}>
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors"
          >
            Log out
          </button>
        )}
      </div>
    </nav>
  );
}
