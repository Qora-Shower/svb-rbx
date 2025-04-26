import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { ArrowLeft, Calendar, Bus, TrainFront } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const Schedule = () => {
  const { id } = useParams();
  
  // Find the route based on the ID from URL
  const route = routes.find(r => r.id === id) || fallbackRoute;
  
  // Determine schedule status and styling
  const scheduleStatus = route.status;

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
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
              <div className="border rounded-lg overflow-hidden">
                <div className="grid grid-cols-7 gap-0 border-b">
                  {weekdays.map((day) => (
                    <div key={day} className="p-3 font-bold text-center border-r last:border-r-0">
                      {day}
                    </div>
                  ))}
                </div>
                
                <ScrollArea className="h-[500px]">
                  <div className="grid grid-cols-7 gap-0">
                    {weekdays.map((day) => (
                      <div key={day} className="border-r last:border-r-0">
                        {getScheduleForDay(day, scheduleStatus).map((time, index) => (
                          <div 
                            key={index} 
                            className={`p-3 text-center border-b last:border-b-0 ${
                              scheduleStatus === 'Baustelle' && index % 5 === 0 ? 'bg-orange-50' : ''
                            }`}
                          >
                            {time}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
            )}
            
            {scheduleStatus === 'Baustelle' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-orange-700 mb-2">Hinweis zu Bauarbeiten</h3>
                <p className="text-orange-600">
                  Aufgrund von Bauarbeiten kann es zu Verspätungen von 5-10 Minuten kommen.
                  Die mit orangem Hintergrund markierten Abfahrten können entfallen.
                  Wir bitten um Ihr Verständnis.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
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

const weekdays = ["MO - FR", "Samstag", "Sonntag"];

const getScheduleForDay = (day, status) => {
  // Return different schedules based on day and status
  const isWeekend = day === "Samstag" || day === "Sonntag";
  
  if (isWeekend) {
    // Weekend schedule has fewer departures
    const times = [];
    for (let hour = 7; hour <= 22; hour++) {
      if (status === 'Baustelle' && hour > 20) continue; // Reduced service on construction days
      times.push(`${hour}:00`);
      times.push(`${hour}:30`);
    }
    return times;
  } else {
    // Weekday schedule
    const times = [];
    for (let hour = 5; hour <= 23; hour++) {
      if (status === 'Baustelle' && (hour < 6 || hour > 22)) continue; // Reduced service on construction days
      
      times.push(`${hour}:00`);
      if (hour >= 7 && hour <= 19) {
        // More frequent during peak hours
        times.push(`${hour}:15`);
        times.push(`${hour}:30`);
        times.push(`${hour}:45`);
      } else {
        // Less frequent during off-peak
        times.push(`${hour}:30`);
      }
    }
    return times;
  }
};

// Sample routes data (same as in RouteDetail)
const routes = [
  {
    id: "bus-1",
    name: "Bus 101",
    type: "bus",
    route: "Hauptbahnhof → Marktplatz → Universität",
    status: "Baustelle",
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
  // ... other routes
];

// Fallback route if ID is not found
const fallbackRoute = {
  id: "Service not found",
  name: "Unknown",
  type: "---",
  status: "---",
  // ... other details
};

export default Schedule;
