/*
import page from "./page"
*/
async function loadPueblos() {
        const res = await fetch(`${process.env.BACKEND_URL}/api/pueblos/`)
        const pueblos = await res.json()
        return pueblos
}


async function ListPueblo(){
    const pueblos = await loadPueblos()
    /*console.log(pueblos)*/

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Pueblos de la España Vaciada
            </h2>
            <ul className="space-y-4">
                {pueblos.map((pueblo) => (
                    <li key={pueblo.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-semibold mb-2 text-gray-800">{pueblo.nombre}</h3>
                            <p className="text-gray-600">
                                <strong>Población:</strong> {pueblo.poblacion !== null ? pueblo.poblacion : 'N/A'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Superficie (km²):</strong> {pueblo.superficie_km2 !== null ? pueblo.superficie_km2.toFixed(2) : 'N/A'}
                            </p>
                            <p className="text-gray-600">
                                <strong>Densidad de Población:</strong> {pueblo.densidad_poblacion !== null ? pueblo.densidad_poblacion.toFixed(2) : 'N/A'}
                            </p>
                        </div>
                     
                            <button
                                className="mt-1 ml-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 self-center"  
                            >  Ver Detalles</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ListPueblo