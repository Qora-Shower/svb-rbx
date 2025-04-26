import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { ArrowLeft, Calendar, Bus, TrainFront, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const RouteDetail = () => {
  const { id } = useParams();
  
  // Find the route based on the ID from URL
  const route = routes.find(r => r.id === id) || fallbackRoute;

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <div className="mb-6">
            <Link to="/timetable">
              <Button variant="ghost" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Zurück zur Übersicht
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="md:w-2/3 space-y-6">
              <div className="flex items-center gap-3">
                {route.type === 'bus' ? (
                  <Bus className="h-8 w-8 text-blue-600" />
                ) : (
                  <TrainFront className="h-8 w-8 text-red-600" />
                )}
                <h1 className="text-3xl font-bold">{route.name}</h1>
                <span className={`px-3 py-1 rounded-full text-sm ${getStatusClass(route.status)}`}>
                  {route.status}
                </span>
              </div>
              
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">Strecke</h2>
                <p className="text-lg font-medium">{route.route}</p>
              </div>
              
              <div className="border-b pb-4 space-y-3">
                <h2 className="text-xl font-semibold">Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span>{route.stations} Stationen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span>Dauer: {route.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-gray-500" />
                    <span>Kapazität: {route.capacity}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span>Takt: {route.frequency}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-b pb-4">
                <h2 className="text-xl font-semibold mb-3">Stationen</h2>
                <div className="space-y-2">
                  {route.stations_list.map((station, index) => (
                    <div key={index} className="flex items-center">
                      <div className="flex flex-col items-center mr-3">
                        <div className={`w-4 h-4 rounded-full ${index === 0 ? 'bg-green-500' : index === route.stations_list.length - 1 ? 'bg-red-500' : 'bg-blue-500'}`}></div>
                        {index < route.stations_list.length - 1 && <div className="w-0.5 h-8 bg-gray-300"></div>}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{station.name}</p>
                        <p className="text-sm text-gray-500">{station.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="md:w-1/3 mt-6 md:mt-0 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Fahrplan</h2>
                <div className="space-y-4">
                  <Link to={`/timetable/${id}/schedule`}>
                    <Button 
                      className={`w-full flex items-center gap-2 justify-between ${getScheduleButtonClass(route.status)}`}
                      variant="outline"
                    >
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>{getScheduleText(route.status)}</span>
                      </div>
                      <ArrowLeft className="h-5 w-5 rotate-180" />
                    </Button>
                  </Link>
                  
                  <div>
                    <p className="text-sm text-gray-600">
                      {route.status === 'Normal' && "Regulärer Fahrplan ohne besondere Einschränkungen."}
                      {route.status === 'Baustelle' && "Aufgrund von Bauarbeiten kann es zu Verzögerungen kommen."}
                      {route.status === 'Gesperrt' && "Diese Linie ist aktuell nicht in Betrieb. Bitte nutzen Sie alternative Routen."}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border">
                <h2 className="text-xl font-semibold mb-3">Hinweise</h2>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {route.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
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

const getScheduleButtonClass = (status) => {
  switch(status) {
    case 'Normal': return 'border-green-500 hover:bg-green-500 hover:text-white';
    case 'Baustelle': return 'border-orange-500 hover:bg-orange-500 hover:text-white';
    case 'Gesperrt': return 'border-red-500 hover:bg-red-500 hover:text-white';
    default: return 'border-gray-300 hover:bg-gray-100';
  }
};

const getScheduleText = (status) => {
  switch(status) {
    case 'Normal': return 'Fahrplan';
    case 'Baustelle': return 'Baustellenfahrplan';
    case 'Gesperrt': return 'Geänderte Linie';
    default: return 'Fahrplan';
  }
};

// Sample route data
const routes = [
  {
    id: "bus-1",
    name: "Bus 101",
    type: "bus",
    route: "Hauptbahnhof → Marktplatz → Universität",
    stations: 12,
    duration: "45 Min.",
    frequency: "alle 15 Min.",
    capacity: "80 Fahrgäste",
    status: "Normal",
    notes: [
      "Barrierefrei zugänglich",
      "WLAN im Fahrzeug verfügbar",
      "USB-Ladestationen an jedem Sitz"
    ],
    stations_list: [
      { name: "Hauptbahnhof", time: "00:00" },
      { name: "Rathaus", time: "00:05" },
      { name: "Marktplatz", time: "00:10" },
      { name: "Theater", time: "00:15" },
      { name: "Stadtpark", time: "00:20" },
      { name: "Bibliothek", time: "00:25" },
      { name: "Studentenwohnheim", time: "00:30" },
      { name: "Mensa", time: "00:35" },
      { name: "Hörsaalgebäude", time: "00:40" },
      { name: "Universität", time: "00:45" }
    ]
  },
  {
    id: "bus-2",
    name: "Bus 202",
    type: "bus",
    route: "Flughafen → Zentrum → Westpark",
    stations: 15,
    duration: "55 Min.",
    frequency: "alle 20 Min.",
    capacity: "95 Fahrgäste",
    status: "Baustelle",
    notes: [
      "Aufgrund von Bauarbeiten Umleitung zwischen Zentrum und Westpark",
      "Haltestelle 'Einkaufszentrum' wird vorübergehend nicht bedient",
      "Mit Verspätungen von 5-10 Minuten ist zu rechnen"
    ],
    stations_list: [
      { name: "Flughafen Terminal 1", time: "00:00" },
      { name: "Flughafen Terminal 2", time: "00:05" },
      { name: "Airport City", time: "00:10" },
      { name: "Gewerbegebiet Ost", time: "00:15" },
      { name: "Stadtgrenze", time: "00:20" },
      { name: "Technologiepark", time: "00:25" },
      { name: "Zentrum", time: "00:30" },
      { name: "Hauptstraße", time: "00:35" },
      { name: "Bahnhofstraße", time: "00:40" },
      { name: "Parkstraße", time: "00:45" },
      { name: "Westpark", time: "00:55" }
    ]
  },
  // Other routes... (truncated for brevity)
];

// Fallback route if ID is not found
const fallbackRoute = {
  id: "not-found",
  name: "Route nicht gefunden",
  type: "bus",
  route: "Information nicht verfügbar",
  stations: 0,
  duration: "N/A",
  frequency: "N/A",
  capacity: "N/A",
  status: "Normal",
  notes: ["Diese Route existiert nicht oder wurde entfernt."],
  stations_list: [
    { name: "Keine Stationen verfügbar", time: "N/A" }
  ]
};

export default RouteDetail;
