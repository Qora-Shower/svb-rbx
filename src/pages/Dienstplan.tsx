
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Import our ShiftContext
import { useShiftContext } from "@/contexts/ShiftContext";

const Dienstplan = () => {
  const { user } = useAuth();
  const { getUserShifts } = useShiftContext();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  // Get shifts for the current user
  const userShifts = getUserShifts(user.username);

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
            {userShifts.length > 0 ? (
              userShifts.map((shift, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className={`py-4 ${getPriorityColor(shift.status)}`}>
                    <CardTitle className="text-white flex justify-between items-center">
                      <span>{shift.date}</span>
                      <span>{shift.time}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Shift Host:</span>
                      <span>{shift.host}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Status:</span>
                      <span className={getPriorityTextColor(shift.status)}>{shift.status}</span>
                    </div>
                    {shift.description && (
                      <div className="pt-2 border-t">
                        <span className="font-bold">Beschreibung:</span>
                        <p className="text-gray-600 mt-1">{shift.description}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border col-span-2">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Dienste zugewiesen</h3>
                <p className="text-gray-600">
                  Dir wurden aktuell keine Dienste zugewiesen. Bitte schaue später wieder vorbei oder kontaktiere den Dienstplaner.
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

// Helper functions for styling
const getPriorityColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'bg-green-600';
    case 'Offen': return 'bg-blue-600';
    case 'Verzögert': return 'bg-orange-500';
    case 'Abgesagt': return 'bg-red-600';
    case 'Voll': return 'bg-gray-600';
    default: return 'bg-gray-600';
  }
};

const getPriorityTextColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'text-green-600';
    case 'Offen': return 'text-blue-600';
    case 'Verzögert': return 'text-orange-500';
    case 'Abgesagt': return 'text-red-600';
    case 'Voll': return 'text-gray-600';
    default: return 'text-gray-600';
  }
};

export default Dienstplan;
