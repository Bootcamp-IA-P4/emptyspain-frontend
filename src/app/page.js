import Image from "next/image";
import ListPueblo from "./dashboard/listPueblo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4 text-center">Home page</h2>
      <ListPueblo />
    </div>
  );
}
