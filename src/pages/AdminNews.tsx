
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Newspaper } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const AdminNews = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sample admin news data - in a real app this would come from a database
  const adminNews = [
    {
      title: "Wichtige Änderungen im Dienstplan",
      author: "SystemAdmin",
      date: "27. April 2025",
      content: "Aufgrund technischer Wartungsarbeiten wurden einige Dienstpläne für die kommende Woche angepasst. Bitte überprüfe deinen Dienstplan regelmäßig auf Änderungen. Bei Fragen wende dich bitte an den zuständigen Dienstplaner."
    },
    {
      title: "Neue Funktionen im Administrationsbereich",
      author: "TechSupport",
      date: "25. April 2025",
      content: "Wir haben den Administrationsbereich um neue Funktionen erweitert. Ab sofort können Mitteilungen direkt an bestimmte Benutzergruppen gesendet werden. Außerdem wurde die Dienstplanerstellung vereinfacht und bietet nun mehr Optionen für wiederkehrende Dienste."
    },
    {
      title: "Schulung für neues Liniennetz",
      author: "Schulungsleiter",
      date: "20. April 2025",
      content: "Am kommenden Samstag findet eine Schulung für das neue Liniennetz statt. Alle Administratoren werden gebeten, daran teilzunehmen, um sich mit den neuen Routen und Fahrplänen vertraut zu machen. Die Schulung beginnt um 10:00 Uhr und endet voraussichtlich um 14:00 Uhr."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <Newspaper className="h-8 w-8" />
              Admin-Mitteilungen
            </h1>
          </div>
          
          <div className="space-y-8">
            {adminNews.length > 0 ? (
              adminNews.map((item, index) => (
                <div key={index} className="border-b pb-6 mb-6 last:border-0">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-500 mb-4">{item.author} • {item.date}</p>
                  <p className="text-gray-800">{item.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Mitteilungen</h3>
                <p className="text-gray-600">
                  Es sind derzeit keine Admin-Mitteilungen vorhanden.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminNews;
