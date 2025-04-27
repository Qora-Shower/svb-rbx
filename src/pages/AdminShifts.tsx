
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminShifts = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("10");
  const [selectedShift, setSelectedShift] = useState("");
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sample shifts - in a real app these would come from a database
  const shifts = [
    { 
      id: "1", 
      host: "MaxBusFahrer", 
      date: "28.04.2025", 
      time: "14:00 - 16:00" 
    },
    { 
      id: "2", 
      host: "BusProfi99", 
      date: "28.04.2025", 
      time: "16:30 - 18:30" 
    },
    { 
      id: "3", 
      host: "SpeedDrive", 
      date: "29.04.2025", 
      time: "08:00 - 10:00" 
    }
  ];

  const handleHostShift = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !startTime || !endTime) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would save the shift to a database
    // For now, we just show a success message and redirect
    
    toast({
      title: "Shift erstellt",
      description: `Die Shift für den ${format(date, "dd.MM.yyyy")} wurde erfolgreich erstellt.`,
    });
    
    navigate("/shift");
  };

  const handleJoinShift = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedShift) {
      toast({
        title: "Fehler",
        description: "Bitte wähle eine Shift aus.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would register the user for this shift in a database
    // For now, we just show a success message and redirect
    
    const shift = shifts.find(s => s.id === selectedShift);
    
    toast({
      title: "Shift angemeldet",
      description: `Du hast dich erfolgreich für die Shift von ${shift?.host} am ${shift?.date} angemeldet.`,
    });
    
    navigate("/dienstplan");
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <Clock className="h-8 w-8" />
            Shift Management
          </h1>
          <p className="text-gray-600 mb-8">
            Erstelle oder melde dich für Shifts an.
          </p>
          
          <Tabs defaultValue="host" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="join">Shift Anmeldung</TabsTrigger>
              <TabsTrigger value="host">Shift Hosten</TabsTrigger>
            </TabsList>
            
            <TabsContent value="join">
              <form onSubmit={handleJoinShift} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="shift">Verfügbare Shifts</Label>
                  <Select onValueChange={setSelectedShift}>
                    <SelectTrigger>
                      <SelectValue placeholder="Shift auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {shifts.map((shift) => (
                        <SelectItem key={shift.id} value={shift.id}>
                          {shift.host}: {shift.date} ({shift.time})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedShift && (
                  <div className="bg-blue-50 p-4 rounded-md">
                    <h3 className="font-bold mb-2">Shift Details</h3>
                    {(() => {
                      const shift = shifts.find(s => s.id === selectedShift);
                      return (
                        <div className="space-y-1">
                          <p><span className="font-medium">Host:</span> {shift?.host}</p>
                          <p><span className="font-medium">Datum:</span> {shift?.date}</p>
                          <p><span className="font-medium">Zeit:</span> {shift?.time}</p>
                        </div>
                      );
                    })()}
                  </div>
                )}
                
                <div className="flex gap-4">
                  <Button type="submit" className="w-full md:w-auto">Für Shift anmelden</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={() => navigate("/admin")}
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="host">
              <form onSubmit={handleHostShift} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="date">Datum</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Clock className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd.MM.yyyy") : <span>Datum auswählen</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startTime">Startzeit</Label>
                      <Input 
                        id="startTime" 
                        type="time" 
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endTime">Endzeit</Label>
                      <Input 
                        id="endTime" 
                        type="time" 
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Maximale Teilnehmer</Label>
                    <Select 
                      defaultValue="10"
                      onValueChange={setMaxParticipants}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5 Teilnehmer</SelectItem>
                        <SelectItem value="10">10 Teilnehmer</SelectItem>
                        <SelectItem value="15">15 Teilnehmer</SelectItem>
                        <SelectItem value="20">20 Teilnehmer</SelectItem>
                        <SelectItem value="30">30 Teilnehmer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Beschreibung</Label>
                    <Textarea 
                      id="description" 
                      placeholder="Beschreibung der Shift" 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="w-full md:w-auto">Shift erstellen</Button>
                  <Button 
                    type="button" 
                    variant="outline"
                    className="w-full md:w-auto"
                    onClick={() => navigate("/admin")}
                  >
                    Abbrechen
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminShifts;
