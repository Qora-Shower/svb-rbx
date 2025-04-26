
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { GalleryHorizontal } from "lucide-react";

const Galerie = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <GalleryHorizontal className="h-8 w-8" />
            Galerie
          </h1>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {busImages.map((bus, index) => (
              <div key={index} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Bild: {bus.name}</span>
                </div>
                <div className="p-3">
                  <h3 className="font-bold text-lg mb-1">{bus.name}</h3>
                  <p className="text-gray-600 text-sm">{bus.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Sample gallery data
const busImages = [
  { name: "Stadtbus 101", description: "Der klassische Stadtbus im Einsatz auf Route 5" },
  { name: "Gelenkbus 203", description: "Kapazitätsstarker Gelenkbus für Hauptrouten" },
  { name: "Elektrobus 304", description: "Umweltfreundlicher Bus auf einer neuen Linie" },
  { name: "Shuttlebus 410", description: "Kleinerer Bus für Nebenrouten" },
  { name: "Nachtbus 505", description: "Speziell ausgestattet für den Nachtverkehr" },
  { name: "Regionalbus 606", description: "Verbindet die Stadt mit den umliegenden Gemeinden" },
  { name: "Expressbus 707", description: "Direktverbindung zwischen wichtigen Knotenpunkten" },
  { name: "Doppeldecker 808", description: "Zweistöckiger Bus für Touristen und hohe Kapazität" },
  { name: "Hybridbus 909", description: "Moderne Hybridtechnologie für umweltbewusstes Fahren" }
];

export default Galerie;
