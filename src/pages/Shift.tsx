
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import { Clock, User, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Import our ShiftContext
import { useShiftContext } from "@/contexts/ShiftContext";

const Shift = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { shifts, updateShiftStatus } = useShiftContext();
  const [selectedShift, setSelectedShift] = useState(null);
  const [shiftStatus, setShiftStatus] = useState("");
  
  // Filter out sample shifts that don't belong to real users
  const realShifts = shifts.filter(shift => 
    shift.host !== "MaxBusFahrer" && 
    shift.host !== "BusProfi99" &&
    shift.host !== "SpeedDrive" &&
    shift.host !== "NachtFahrer" &&
    shift.host !== "BusKönig" &&
    shift.host !== "SchulbusFan"
  );
  
  const handleStatusChange = (shiftId, status) => {
    updateShiftStatus(shiftId, status);
    setSelectedShift(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
              <Clock className="h-8 w-8" />
              Kommende Shifts
            </h1>
            
            {user && (
              <Button onClick={() => navigate("/admin/shifts")} className="bg-blue-600 hover:bg-blue-700">
                <Clock className="mr-2 h-4 w-4" />
                Shift Management
              </Button>
            )}
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {realShifts.length > 0 ? (
              realShifts.map((shift) => (
                <Card key={shift.id} className="overflow-hidden hover:shadow-md transition-all">
                  <CardHeader className={`py-4 ${getStatusColor(shift.status)}`}>
                    <CardTitle className="text-white flex justify-between items-center">
                      <span>{shift.date}</span>
                      <span>{shift.time}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-5">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-bold flex items-center">
                          <User className="h-4 w-4 mr-2" /> Host:
                        </span>
                        <span>{shift.host}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-bold">Status:</span>
                        <span className={getStatusTextColor(shift.status)}>{shift.status}</span>
                      </div>
                      
                      {user && user.username === shift.host && (
                        <div className="mt-4 pt-4 border-t">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" className="w-full flex items-center">
                                <Settings className="mr-2 h-4 w-4" />
                                Shift verwalten
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Shift verwalten</DialogTitle>
                                <DialogDescription>
                                  Verwaltung deines Shifts vom {shift.date}, {shift.time}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <label className="font-medium">Status</label>
                                  <Select 
                                    defaultValue={shift.status}
                                    onValueChange={(value) => handleStatusChange(shift.id, value)}
                                  >
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Aktiv">Aktiv (Findet statt)</SelectItem>
                                      <SelectItem value="Verzögert">Verzögert</SelectItem>
                                      <SelectItem value="Abgesagt">Abgesagt</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                
                                <Button 
                                  onClick={() => navigate("/admin/shifts")} 
                                  className="w-full"
                                >
                                  Bearbeiten
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                      
                      {user && user.username !== shift.host && (
                        <div className="mt-4 pt-4 border-t">
                          <Button variant="outline" className="w-full">
                            Teilnehmen
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border col-span-3">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Shifts</h3>
                <p className="text-gray-600 mb-4">
                  Es sind derzeit keine Shifts vorhanden.
                </p>
                {user && (
                  <Button onClick={() => navigate("/admin/shifts")}>
                    <Clock className="mr-2 h-4 w-4" />
                    Shift erstellen
                  </Button>
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

// Helper functions for styling
const getStatusColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'bg-green-600';
    case 'Offen': return 'bg-blue-600';
    case 'Verzögert': return 'bg-orange-500';
    case 'Abgesagt': return 'bg-red-600';
    case 'Voll': return 'bg-gray-600';
    default: return 'bg-gray-600';
  }
};

const getStatusTextColor = (status) => {
  switch(status) {
    case 'Aktiv': return 'text-green-600';
    case 'Offen': return 'text-blue-600';
    case 'Verzögert': return 'text-orange-500';
    case 'Abgesagt': return 'text-red-600';
    case 'Voll': return 'text-gray-600';
    default: return 'text-gray-600';
  }
};

export default Shift;
