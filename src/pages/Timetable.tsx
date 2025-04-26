
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import { Calendar, Bus, TrainFront, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Timetable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  // Filter transport lines based on search term and selected filter
  const filteredLines = transportLines.filter((line) => {
    const matchesSearch = line.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        line.route.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    return matchesSearch && line.type === filter;
  });

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Fahrpläne
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 rounded-full border-gray-300 focus:border-[#33C3F0] focus:ring focus:ring-[#33C3F0] focus:ring-opacity-50"
                placeholder="Suche nach Linien oder Routen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px] rounded-full">
                <SelectValue placeholder="Filter" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle</SelectItem>
                <SelectItem value="bus">Bus</SelectItem>
                <SelectItem value="train">Zug</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredLines.map((line) => (
              <Link to={`/timetable/${line.id}`} key={line.id} className="no-underline text-inherit">
                <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 bg-white">
                  <div className={`p-4 flex items-center justify-between ${line.type === 'bus' ? 'bg-blue-50' : 'bg-red-50'}`}>
                    <div className="flex items-center gap-3">
                      {line.type === 'bus' ? (
                        <Bus className="h-6 w-6 text-blue-600" />
                      ) : (
                        <TrainFront className="h-6 w-6 text-red-600" />
                      )}
                      <h3 className="font-bold text-lg">{line.name}</h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusClass(line.status)}`}>
                      {line.status}
                    </span>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-700 mb-2">{line.route}</p>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{line.stations} Stationen</span>
                      <span>{line.duration}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function for styling status badges
const getStatusClass = (status) => {
  switch(status) {
    case 'Normal': return 'bg-green-100 text-green-800';
    case 'Baustelle': return 'bg-orange-100 text-orange-800';
    case 'Gesperrt': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Sample transport line data
const transportLines = [
  {
    id: "bus-1",
    name: "Bus 101",
    type: "bus",
    route: "Hauptbahnhof → Marktplatz → Universität",
    stations: 12,
    duration: "45 Min.",
    status: "Normal"
  },
  {
    id: "bus-2",
    name: "Bus 202",
    type: "bus",
    route: "Flughafen → Zentrum → Westpark",
    stations: 15,
    duration: "55 Min.",
    status: "Baustelle"
  },
  {
    id: "bus-3",
    name: "Bus 303",
    type: "bus",
    route: "Nordstadt → Einkaufszentrum → Südpark",
    stations: 18,
    duration: "60 Min.",
    status: "Normal"
  },
  {
    id: "bus-4",
    name: "Bus 404",
    type: "bus",
    route: "Ostbahnhof → Krankenhaus → Sportzentrum",
    stations: 10,
    duration: "35 Min.",
    status: "Gesperrt"
  },
  {
    id: "train-1",
    name: "Zug RE1",
    type: "train",
    route: "Hauptbahnhof → Weststadt → Vorort Nord",
    stations: 8,
    duration: "32 Min.",
    status: "Normal"
  },
  {
    id: "train-2",
    name: "Zug RE2",
    type: "train",
    route: "Hauptbahnhof → Oststadt → Industriegebiet",
    stations: 7,
    duration: "28 Min.",
    status: "Baustelle"
  },
  {
    id: "train-3",
    name: "Zug S1",
    type: "train",
    route: "Hauptbahnhof → Zentrum → Flughafen",
    stations: 10,
    duration: "40 Min.",
    status: "Normal"
  },
  {
    id: "train-4",
    name: "Zug S2",
    type: "train",
    route: "Vorort Süd → Zentrum → Vorort Nord",
    stations: 15,
    duration: "50 Min.",
    status: "Normal"
  },
  {
    id: "bus-5",
    name: "Bus 505",
    type: "bus",
    route: "Bahnhof West → Stadion → Einkaufszentrum",
    stations: 14,
    duration: "45 Min.",
    status: "Normal"
  }
];

export default Timetable;
