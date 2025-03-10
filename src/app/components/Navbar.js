"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/authContext";
import { HomeIcon } from "@heroicons/react/solid";

export default function Navbar() {
  const { user, handleLogout } = useAuth();
  const pathname = usePathname(); // Obtiene la ruta actual

  const linkClasses = (href) =>
    `text-white hover:text-gray-300 transition-colors px-3 py-2 rounded-md ${
      pathname === href ? "font-bold" : ""
    }`;

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 shadow-md">
      <div className="flex items-center gap-4">
        <HomeIcon className="h-6 w-6 text-white" />
        <Link href="/" className={`${linkClasses("/")} text-xl font-bold`}>
          España Vaciada
        </Link>
      </div>
      <div className="flex gap-4">
        <Link href="/" className={linkClasses("/")}>
          Home
        </Link>
        {user && (
          <Link href="/towns" className={linkClasses("/towns")}>
            Pueblos
          </Link>
        )}
        {user && user.tipo_usuario === "visualizador" && (
          <Link href="/favorites" className={linkClasses("/favorites")}>
            Favoritos
          </Link>
        )}

        {!user ? (
          <>
            <Link href="/login" className={linkClasses("/login")}>
              Log in
            </Link>
            <Link href="/register" className={linkClasses("/register")}>
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
