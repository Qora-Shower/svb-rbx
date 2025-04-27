
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useShiftContext } from "@/contexts/ShiftContext";
import { cn } from "@/lib/utils";

const Dienstplan = () => {
  const { user } = useAuth();
  const { getUserShifts, isShiftExpired } = useShiftContext();
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  const userShifts = getUserShifts(user.username);

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2 mb-2">
            <Calendar className="h-8 w-8" />
            Persönlicher Dienstplan
          </h1>
          <p className="text-gray-600 mb-8">
            Hallo {user.username}, hier ist dein persönlicher Dienstplan für die kommenden Tage:
          </p>
          
          <div className="space-y-6">
            {userShifts.length > 0 ? (
              userShifts
                .filter(shift => !isShiftExpired(shift) || shift.status !== "Abgesagt")
                .map((shift) => (
                  <Card key={shift.id} className="overflow-hidden">
                    <CardHeader 
                      className={cn(
                        "py-6 text-white",
                        shift.status === "Aktiv" && "bg-green-500",
                        shift.status === "Verzögert" && "bg-orange-500",
                        shift.status === "Abgesagt" && "bg-red-500"
                      )}
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="text-3xl font-bold">{shift.date}</div>
                        <div className="text-2xl font-semibold flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          {shift.time}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-6 space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <span className="font-bold text-gray-700">Shift Host:</span>
                          <span className="ml-2">{shift.host}</span>
                        </div>
                        <div>
                          <span className="font-bold text-gray-700">Status:</span>
                          <span 
                            className={cn(
                              "ml-2",
                              shift.status === "Aktiv" && "text-green-600",
                              shift.status === "Verzögert" && "text-orange-500",
                              shift.status === "Abgesagt" && "text-red-500"
                            )}
                          >
                            {shift.status}
                          </span>
                        </div>
                        
                        {shift.participants?.find(p => p.username === user.username)?.service && (
                          <div>
                            <span className="font-bold text-gray-700">Dienst:</span>
                            <span className="ml-2">
                              {shift.participants.find(p => p.username === user.username)?.service}
                            </span>
                          </div>
                        )}
                        
                        {shift.participants?.find(p => p.username === user.username)?.role && (
                          <div>
                            <span className="font-bold text-gray-700">Rolle:</span>
                            <span className="ml-2">
                              {shift.participants.find(p => p.username === user.username)?.role}
                            </span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Dienste zugewiesen</h3>
                <p className="text-gray-600">
                  Dir wurden aktuell keine Dienste zugewiesen. Bitte schaue später wieder vorbei oder melde dich für einen Shift an.
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

export default Dienstplan;
