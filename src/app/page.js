"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const handleRedirect = () => {
    router.push("/dashboard");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      {user ? (
        // Si el usuario está logueado, mostrar mensaje de bienvenida
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-3xl font-semibold mb-4 text-indigo-600">
            ¡Hola, {user.username}!
          </h2>
          <p className="text-gray-700 mb-8">
            Nos alegra verte de nuevo. Ya puedes explorar la España Vaciada y
            contribuir a la revitalización de nuestros pueblos.
          </p>
          <button
            onClick={handleRedirect}
            className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors mb-4"
          >
            Ir al Dashboard
          </button>
        </div>
      ) : (
        // Si no está logueado, mostrar información sobre la España Vaciada
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-gray-700 mb-4">
            La España Vaciada hace referencia a las áreas rurales de España que
            han sufrido una despoblación significativa en las últimas décadas.
            Muchas de estas localidades enfrentan desafíos económicos y
            sociales, pero también tienen un gran potencial y recursos únicos
            que las hacen especiales.
          </p>
          <p className="text-gray-700 mb-4">
            La revitalización de estos pueblos es esencial para preservar su
            patrimonio cultural y promover un desarrollo sostenible. Al crear tu
            cuenta, podrás explorar una lista de pueblos en la España Vaciada y
            contribuir a su promoción y desarrollo. Si quieres añadir un pueblo
            a la lista, ¡regístrate y comienza a colaborar!
          </p>
          <div className="flex gap-4 justify-center items-center">
            <button
              onClick={() => router.push("/register")}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors mb-8"
            >
              Regístrate
            </button>
            <button
              onClick={() => router.push("/login")}
              className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors mb-8"
            >
              Inicia sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
