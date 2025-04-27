import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Bus, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Schedule = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("mo-fr");
  
  // Find the route based on the ID from URL
  const route = routes.find(r => r.id === id) || fallbackRoute;
  
  // Determine schedule status and styling
  const scheduleStatus = route.status;

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="mb-6">
            <Link to={`/timetable/${id}`}>
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Routendetails
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-3">
              {route.type === 'bus' ? (
                <Bus className="h-8 w-8 text-blue-600" />
              ) : (
                <TrainFront className="h-8 w-8 text-red-600" />
              )}
              <h1 className="text-3xl font-bold">{route.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(scheduleStatus)}`}>
                {scheduleStatus}
              </span>
            </div>
            
            <div className="flex items-center mb-4">
              <Calendar className="h-6 w-6 mr-2 text-gray-500" />
              <h2 className="text-xl font-semibold">{getScheduleTitle(scheduleStatus)}</h2>
            </div>

            {scheduleStatus === 'Gesperrt' ? (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                <h3 className="text-xl font-bold text-red-700 mb-2">Diese Linie ist aktuell gesperrt</h3>
                <p className="text-red-600">
                  Aufgrund von umfangreichen Bauarbeiten ist diese Linie vorübergehend nicht in Betrieb.
                  Bitte nutzen Sie die alternativen Routen oder wenden Sie sich an den Kundenservice für weitere Informationen.
                </p>
                <div className="mt-4 p-4 bg-white rounded-lg border border-red-100">
                  <h4 className="font-bold mb-2">Alternative Routen:</h4>
                  <ul className="list-disc pl-5 text-left">
                    <li>Bus 303: Nordstadt → Einkaufszentrum → Südpark</li>
                    <li>Bus 505: Bahnhof West → Stadion → Einkaufszentrum</li>
                    <li>Zug S1: Hauptbahnhof → Zentrum → Flughafen</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <Tabs defaultValue="mo-fr" value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6">
                    <TabsTrigger value="mo-fr">MO - FR</TabsTrigger>
                    <TabsTrigger value="samstag">Samstag</TabsTrigger>
                    <TabsTrigger value="sonntag">Sonntag</TabsTrigger>
                    <TabsTrigger value="feiertag">Feiertag</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="mo-fr" className="border rounded-lg">
                    <div className="p-4 bg-blue-50">
                      <h3 className="font-bold">Montag bis Freitag</h3>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">04:00 - 06:00</h4>
                          <p>Alle 20 Minuten: 04:00, 04:20, 04:40, 05:00, 05:20, 05:40</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">06:00 - 09:00 (Hauptverkehrszeit)</h4>
                          <p>Alle 10 Minuten: 06:00, 06:10, 06:20, 06:30... bis 09:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">09:00 - 15:00</h4>
                          <p>Alle 15 Minuten: 09:00, 09:15, 09:30, 09:45... bis 15:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">15:00 - 19:00 (Hauptverkehrszeit)</h4>
                          <p>Alle 10 Minuten: 15:00, 15:10, 15:20, 15:30... bis 19:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">19:00 - 22:00</h4>
                          <p>Alle 15 Minuten: 19:00, 19:15, 19:30, 19:45... bis 22:00</p>
                        </div>
                        <div className="pb-4">
                          <h4 className="font-semibold text-lg mb-2">22:00 - 00:00</h4>
                          <p>Alle 30 Minuten: 22:00, 22:30, 23:00, 23:30</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="samstag" className="border rounded-lg">
                    <div className="p-4 bg-blue-50">
                      <h3 className="font-bold">Samstag</h3>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">06:00 - 09:00</h4>
                          <p>Alle 20 Minuten: 06:00, 06:20, 06:40, 07:00... bis 09:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">09:00 - 18:00</h4>
                          <p>Alle 15 Minuten: 09:00, 09:15, 09:30, 09:45... bis 18:00</p>
                        </div>
                        <div className="pb-4">
                          <h4 className="font-semibold text-lg mb-2">18:00 - 23:00</h4>
                          <p>Alle 20 Minuten: 18:00, 18:20, 18:40, 19:00... bis 23:00</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="sonntag" className="border rounded-lg">
                    <div className="p-4 bg-blue-50">
                      <h3 className="font-bold">Sonntag</h3>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">07:00 - 12:00</h4>
                          <p>Alle 30 Minuten: 07:00, 07:30, 08:00... bis 12:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">12:00 - 19:00</h4>
                          <p>Alle 20 Minuten: 12:00, 12:20, 12:40, 13:00... bis 19:00</p>
                        </div>
                        <div className="pb-4">
                          <h4 className="font-semibold text-lg mb-2">19:00 - 22:00</h4>
                          <p>Alle 30 Minuten: 19:00, 19:30, 20:00... bis 22:00</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                  
                  <TabsContent value="feiertag" className="border rounded-lg">
                    <div className="p-4 bg-blue-50">
                      <h3 className="font-bold">Feiertag/Ferien</h3>
                    </div>
                    <ScrollArea className="h-[400px]">
                      <div className="p-4 space-y-4">
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">07:00 - 12:00</h4>
                          <p>Alle 30 Minuten: 07:00, 07:30, 08:00... bis 12:00</p>
                        </div>
                        <div className="border-b pb-4">
                          <h4 className="font-semibold text-lg mb-2">12:00 - 19:00</h4>
                          <p>Alle 20 Minuten: 12:00, 12:20, 12:40, 13:00... bis 19:00</p>
                        </div>
                        <div className="pb-4">
                          <h4 className="font-semibold text-lg mb-2">19:00 - 21:00</h4>
                          <p>Alle 30 Minuten: 19:00, 19:30, 20:00, 20:30, 21:00</p>
                        </div>
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
                
                {scheduleStatus === 'Baustelle' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-orange-700 mb-2">Hinweis zu Bauarbeiten</h3>
                    <p className="text-orange-600">
                      Aufgrund von Bauarbeiten kann es zu Verspätungen von 5-10 Minuten kommen.
                      Einige Abfahrten können entfallen.
                      Wir bitten um Ihr Verständnis.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper functions
const getStatusClass = (status) => {
  switch(status) {
    case 'Normal': return 'bg-green-100 text-green-800';
    case 'Baustelle': return 'bg-orange-100 text-orange-800';
    case 'Gesperrt': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getScheduleTitle = (status) => {
  switch(status) {
    case 'Normal': return 'Regulärer Fahrplan';
    case 'Baustelle': return 'Baustellenfahrplan';
    case 'Gesperrt': return 'Geänderte Linie';
    default: return 'Fahrplan';
  }
};

// Sample routes data (same as in RouteDetail)
const routes = [
  {
    id: "bus-1",
    name: "Bus 101",
    type: "bus",
    route: "Hauptbahnhof → Marktplatz → Universität",
    status: "Normal",
    // ... other details
  },
  {
    id: "bus-2",
    name: "Bus 202",
    type: "bus",
    route: "Flughafen → Zentrum → Westpark",
    status: "Baustelle",
    // ... other details
  },
  {
    id: "bus-4",
    name: "Bus 404",
    type: "bus",
    route: "Ostbahnhof → Krankenhaus → Sportzentrum",
    status: "Gesperrt",
    // ... other details
  },
  {
    id: "train-1",
    name: "Zug RE1",
    type: "train",
    route: "Hauptbahnhof → Weststadt → Vorort Nord",
    status: "Normal"
  },
  // Add all routes from RouteDetail here
];

// Fallback route if ID is not found
const fallbackRoute = {
  id: "not-found",
  name: "Route nicht gefunden",
  type: "bus",
  route: "Information nicht verfügbar",
  status: "Normal",
};

export default Schedule;
