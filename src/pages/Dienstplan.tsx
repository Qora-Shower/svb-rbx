
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const Dienstplan = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Persönlicher Dienstplan
          </h1>
          <p className="text-gray-600 mb-8">
            Hallo {user.username}, hier ist dein persönlicher Dienstplan für die kommenden Tage:
          </p>
          
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            {dienstplan.map((dienst, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                <CardHeader className={`py-4 ${getPriorityColor(dienst.priority)}`}>
                  <CardTitle className="text-white flex justify-between items-center">
                    <span>{dienst.date}</span>
                    <span>{dienst.time}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Route:</span>
                    <span>{dienst.route}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Position:</span>
                    <span>{dienst.position}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold">Priorität:</span>
                    <span className={getPriorityTextColor(dienst.priority)}>{dienst.priority}</span>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="font-bold">Hinweise:</span>
                    <p className="text-gray-600 mt-1">{dienst.notes}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {dienstplan.length === 0 && (
            <div className="text-center p-12 bg-gray-50 rounded-lg border">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Dienste zugewiesen</h3>
              <p className="text-gray-600">
                Dir wurden aktuell keine Dienste zugewiesen. Bitte schaue später wieder vorbei oder kontaktiere den Dienstplaner.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper functions for styling
const getPriorityColor = (priority) => {
  switch(priority) {
    case 'Hoch': return 'bg-red-600';
    case 'Mittel': return 'bg-orange-500';
    case 'Standard': return 'bg-blue-600';
    default: return 'bg-gray-600';
  }
};

const getPriorityTextColor = (priority) => {
  switch(priority) {
    case 'Hoch': return 'text-red-600';
    case 'Mittel': return 'text-orange-500';
    case 'Standard': return 'text-blue-600';
    default: return 'text-gray-600';
  }
};

// Sample dienstplan data - in a real app this would come from an API based on the user
const dienstplan = [
  {
    date: "28.04.2025",
    route: "Bus 101: Hauptbahnhof → Universität",
    time: "14:00 - 16:00",
    priority: "Standard",
    position: "Fahrer",
    notes: "Regulärer Wochentags-Dienst. Bitte 15 Minuten vor Dienstbeginn anwesend sein."
  },
  {
    date: "30.04.2025",
    route: "Bus 202: Flughafen → Zentrum",
    time: "08:00 - 10:00",
    priority: "Hoch",
    position: "Fahrer",
    notes: "Erhöhtes Fahrgastaufkommen erwartet aufgrund einer Veranstaltung. Bitte besondere Aufmerksamkeit."
  },
  {
    date: "02.05.2025",
    route: "Bus 303: Nordstadt → Südpark",
    time: "16:30 - 18:30",
    priority: "Mittel",
    position: "Co-Fahrer",
    notes: "Schulung für neue Strecke. Du wirst einem erfahrenen Fahrer zugeteilt."
  },
  {
    date: "05.05.2025",
    route: "Zug RE1: Hauptbahnhof → Vorort Nord",
    time: "10:30 - 12:30",
    priority: "Mittel",
    position: "Schaffner",
    notes: "Bitte aktuelle Baustelleninformationen vor Dienstbeginn prüfen."
  }
];

export default Dienstplan;
