
import NavBar from "@/components/NavBar";
import { Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";

const Shift = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Clock className="h-8 w-8" />
            Kommende Shifts
          </h1>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {shifts.map((shift, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-md transition-all">
                <CardHeader className={`py-4 ${getStatusColor(shift.status)}`}>
                  <CardTitle className="text-white flex justify-between items-center">
                    <span>{shift.date}</span>
                    <span>{shift.time}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-5">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Host:</span>
                      <span>{shift.host}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">Status:</span>
                      <span className={getStatusTextColor(shift.status)}>{shift.status}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Helper functions for styling
const getStatusColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'bg-green-600';
    case 'Offen': return 'bg-blue-600';
    case 'Bald': return 'bg-orange-500';
    case 'Voll': return 'bg-red-600';
    default: return 'bg-gray-600';
  }
};

const getStatusTextColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'text-green-600';
    case 'Offen': return 'text-blue-600';
    case 'Bald': return 'text-orange-500';
    case 'Voll': return 'text-red-600';
    default: return 'text-gray-600';
  }
};

// Sample shift data
const shifts = [
  {
    date: "27.04.2025",
    host: "MaxBusFahrer",
    time: "14:00 - 16:00",
    status: "Aktiv",
  },
  {
    date: "27.04.2025",
    host: "BusProfi99",
    time: "16:30 - 18:30",
    status: "Offen",
  },
  {
    date: "28.04.2025",
    host: "SpeedDrive",
    time: "08:00 - 10:00",
    status: "Bald",
  },
  {
    date: "28.04.2025",
    host: "NachtFahrer",
    time: "22:00 - 00:00",
    status: "Voll",
  },
  {
    date: "29.04.2025",
    host: "BusKönig",
    time: "10:30 - 12:30",
    status: "Offen",
  },
  {
    date: "29.04.2025",
    host: "SchulbusFan",
    time: "07:30 - 09:30",
    status: "Offen",
  }
];

export default Shift;
