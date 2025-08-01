
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Bus, TrainFront, MapPin, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const RouteDetail = () => {
  const { id } = useParams();
  
  // Find the route based on the ID from URL
  const route = routes.find(r => r.id === id) || fallbackRoute;

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
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
                  
                  {route.status === 'Baustelle' && (
                    <Link to={`/timetable/${id}/schedule?variant=construction`}>
                      <Button 
                        className="w-full flex items-center gap-2 justify-between border-orange-500 hover:bg-orange-500 hover:text-white mt-2"
                        variant="outline"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>Baustellenfahrplan</span>
                        </div>
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                      </Button>
                    </Link>
                  )}
                  
                  {route.status === 'Gesperrt' && (
                    <Link to={`/timetable/${id}/schedule?variant=alternative`}>
                      <Button 
                        className="w-full flex items-center gap-2 justify-between border-red-500 hover:bg-red-500 hover:text-white mt-2"
                        variant="outline"
                      >
                        <div className="flex items-center gap-2">
                          <Calendar className="h-5 w-5" />
                          <span>Alternative Routen</span>
                        </div>
                        <ArrowLeft className="h-5 w-5 rotate-180" />
                      </Button>
                    </Link>
                  )}
                  
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
                  {route.notes && route.notes.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            </div>
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
    case 'Baustelle': return 'Fahrplan';
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
  {
    id: "train-1",
    name: "RE1",
    type: "train",
    route: "Verona → Merano → Milan",
    stations: 15,
    duration: "55 Min.",
    frequency: "alle 30 Min.",
    capacity: "120 Fahrgäste",
    status: "Baustelle",
    notes: [
      "Aufgrund von Bauarbeiten Umleitung zwischen Merano und Milan",
      "Haltestelle 'Merano westbahnhof' wird vorübergehend nicht bedient",
      "Mit Verspätungen von 20-40 Minuten ist zu rechnen"
    ],
    stations_list: [
      { name: "Verona", time: "Start" },
      { name: "Venedic", time: "+5 min" },
      { name: "Airport City", time: "+5 min" },
      { name: "Gewerbegebiet Ost", time: "+5 min" },
      { name: "Stadtgrenze", time: "+5 min" },
      { name: "Technologiepark", time: "+5 min" },
      { name: "Zentrum", time: "+5 min" },
      { name: "Hauptstraße", time: "+5 min" },
      { name: "Bahnhofstraße", time: "+5 min" },
      { name: "Parkstraße", time: "+5 min" },
      { name: "Westpark", time: "End" }
    ]
  },
  {
    id: "bus-3",
    name: "Bus 303",
    type: "bus",
    route: "Nordstadt → Einkaufszentrum → Südpark",
    stations: 18,
    duration: "60 Min.",
    frequency: "alle 15 Min.",
    capacity: "85 Fahrgäste",
    status: "Normal",
    notes: [
      "Barrierefrei zugänglich", 
      "Fahrradmitnahme möglich", 
      "Kein WLAN verfügbar"
    ],
    stations_list: [
      { name: "Nordstadt Terminal", time: "00:00" },
      { name: "Nordbahnhof", time: "00:05" },
      { name: "Industriegebiet Nord", time: "00:10" },
      { name: "Wohnsiedlung A", time: "00:15" },
      { name: "Wohnsiedlung B", time: "00:20" },
      { name: "Einkaufszentrum Nord", time: "00:25" },
      { name: "Stadtmitte", time: "00:35" },
      { name: "Einkaufszentrum Süd", time: "00:45" },
      { name: "Südpark", time: "00:60" }
    ]
  },
  {
    id: "bus-4",
    name: "Bus 404",
    type: "bus",
    route: "Ostbahnhof → Krankenhaus → Sportzentrum",
    stations: 10,
    duration: "35 Min.",
    frequency: "alle 20 Min.",
    capacity: "75 Fahrgäste",
    status: "Gesperrt",
    notes: [
      "Diese Linie ist aufgrund umfangreicher Straßenbauarbeiten gesperrt",
      "Bitte nutzen Sie die Alternativlinien 303 oder 505",
      "Voraussichtliche Wiederinbetriebnahme: 15.06.2025"
    ],
    stations_list: [
      { name: "Ostbahnhof", time: "00:00" },
      { name: "Ostmarkt", time: "00:05" },
      { name: "Schulzentrum Ost", time: "00:10" },
      { name: "Krankenhaus Haupteingang", time: "00:15" },
      { name: "Krankenhaus Südflügel", time: "00:18" },
      { name: "Wohngebiet Ost", time: "00:23" },
      { name: "Parkplatz Sportzentrum", time: "00:28" },
      { name: "Sportzentrum", time: "00:35" }
    ]
  },
  {
    id: "train-2",
    name: "RE2",
    type: "train",
    route: "Hauptbahnhof → Oststadt → Industriegebiet",
    stations: 7,
    duration: "28 Min.",
    frequency: "alle 30 Min.",
    capacity: "150 Fahrgäste",
    status: "Baustelle",
    notes: [
      "Aufgrund von Gleisbauarbeiten reduzierte Geschwindigkeit",
      "Mit Verspätungen von 5-10 Minuten ist zu rechnen",
      "Keine Fahrradmitnahme möglich während der Bauarbeiten"
    ],
    stations_list: [
      { name: "Hauptbahnhof", time: "00:00" },
      { name: "Messegelände", time: "00:05" },
      { name: "Oststadt", time: "00:12" },
      { name: "Technologiepark", time: "00:18" },
      { name: "Gewerbegebiet", time: "00:22" },
      { name: "Industriepark", time: "00:28" }
    ]
  },
  {
    id: "train-3",
    name: "S1",
    type: "train",
    route: "Hauptbahnhof → Zentrum → Flughafen",
    stations: 10,
    duration: "40 Min.",
    frequency: "alle 20 Min.",
    capacity: "180 Fahrgäste",
    status: "Normal",
    notes: [
      "Express-Service zum Flughafen",
      "WLAN im gesamten Zug verfügbar",
      "Barrierefrei zugänglich"
    ],
    stations_list: [
      { name: "Hauptbahnhof", time: "00:00" },
      { name: "Zentrum", time: "00:08" },
      { name: "Messegelände", time: "00:15" },
      { name: "Stadtgrenze", time: "00:22" },
      { name: "Gewerbepark", time: "00:28" },
      { name: "Flughafen Terminal 2", time: "00:35" },
      { name: "Flughafen Terminal 1", time: "00:40" }
    ]
  },
  {
    id: "train-4",
    name: "S2",
    type: "train",
    route: "Vorort Süd → Zentrum → Vorort Nord",
    stations: 15,
    duration: "50 Min.",
    frequency: "alle 15 Min.",
    capacity: "160 Fahrgäste",
    status: "Normal",
    notes: [
      "Halt an allen Stationen",
      "Fahrradmitnahme zu jeder Zeit möglich",
      "Kinderwagen-freundlich mit extra breiten Einstiegen"
    ],
    stations_list: [
      { name: "Vorort Süd", time: "00:00" },
      { name: "Südpark", time: "00:05" },
      { name: "Universität Süd", time: "00:10" },
      { name: "Technologiepark", time: "00:15" },
      { name: "Zentrum", time: "00:25" },
      { name: "Rathaus", time: "00:30" },
      { name: "Hauptstraße", time: "00:35" },
      { name: "Nordpark", time: "00:40" },
      { name: "Industriegebiet Nord", time: "00:45" },
      { name: "Vorort Nord", time: "00:50" }
    ]
  },
  {
    id: "bus-5",
    name: "Bus 505",
    type: "bus",
    route: "Bahnhof West → Stadion → Einkaufszentrum",
    stations: 14,
    duration: "45 Min.",
    frequency: "alle 10 Min.",
    capacity: "90 Fahrgäste",
    status: "Normal",
    notes: [
      "Verstärkte Taktung bei Veranstaltungen im Stadion",
      "Shuttle-Service am Wochenende zum Einkaufszentrum",
      "Barrierefrei zugänglich"
    ],
    stations_list: [
      { name: "Bahnhof West", time: "00:00" },
      { name: "Westmarkt", time: "00:05" },
      { name: "Wohngebiet West", time: "00:10" },
      { name: "Stadionvorplatz", time: "00:15" },
      { name: "Stadion Haupteingang", time: "00:18" },
      { name: "Sportpark", time: "00:23" },
      { name: "Gewerbegebiet West", time: "00:30" },
      { name: "Schulzentrum", time: "00:35" },
      { name: "Einkaufszentrum", time: "00:45" }
    ]
  }
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
