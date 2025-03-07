"use client";
import { useRouter } from 'next/navigation'; // Cambiado de next/router a next/navigation

export default function Home() {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/dashboard');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-600 text-center">Bienvenido a la Página de Inicio</h1>
      <button
        onClick={handleRedirect}
        className="bg-indigo-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-indigo-700 transition-colors mb-8"
      >
        Ir al Dashboard
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-3xl font-semibold mb-4 text-indigo-600">La España Vaciada</h2>
        <p className="text-gray-700 mb-4">
          La España Vaciada hace referencia a las áreas rurales de España que han sufrido una despoblación
          significativa en las últimas décadas. Muchas de estas localidades enfrentan desafíos económicos y sociales,
          pero también tienen un gran potencial y recursos únicos que las hacen especiales.
        </p>
        <p className="text-gray-700 mb-4">
          La revitalización de estos pueblos es esencial para preservar su patrimonio cultural y promover un desarrollo
          sostenible. A continuación, puedes explorar algunas de estas localidades en nuestro Dashboard.
        </p>
      </div>
    </div>
  );
}
