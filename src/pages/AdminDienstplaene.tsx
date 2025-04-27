import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Bus, Train } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminDienstplaene = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [vehicleType, setVehicleType] = useState("bus");
  const [route, setRoute] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [position, setPosition] = useState("Fahrer");
  const [priority, setPriority] = useState("Standard");
  const [notes, setNotes] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sample routes - in a real app these would come from a database
  const busRoutes = [
    "Bus 101: Hauptbahnhof → Universität",
    "Bus 202: Flughafen → Zentrum",
    "Bus 303: Nordstadt → Südpark",
    "Bus 404: Einkaufszentrum → Stadion",
  ];
  
  const trainRoutes = [
    "Zug RE1: Hauptbahnhof → Vorort Nord",
    "Zug RE2: Hauptbahnhof → Flughafen",
    "Zug RB5: Hauptbahnhof → Südliche Vororte",
  ];
  
  // Sample users - in a real app these would come from a database
  const users = [
    "MaxBusFahrer",
    "BusProfi99",
    "SpeedDrive",
    "NachtFahrer",
    "BusKönig",
    "SchulbusFan",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!date || !startTime || !endTime || !route) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would save the schedule to a database
    // For now, we just show a success message and redirect
    
    toast({
      title: "Dienstplan erstellt",
      description: `Der Dienstplan für ${selectedUser || user.username} wurde erfolgreich erstellt.`,
    });
    
    navigate("/admin");
  };

  const getRoutes = () => {
    return vehicleType === "bus" ? busRoutes : trainRoutes;
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <Calendar className="h-8 w-8" />
            Dienstplan erstellen
          </h1>
          <p className="text-gray-600 mb-8">
            Erstelle oder bearbeite Dienstpläne für Mitarbeiter.
          </p>
          
          <Tabs defaultValue="create" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="create">Neuen Dienst erstellen</TabsTrigger>
              <TabsTrigger value="assign">Mitarbeiter zuweisen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Fahrzeugtyp</Label>
                    <div className="flex space-x-2">
                      <Button 
                        type="button"
                        variant={vehicleType === "bus" ? "default" : "outline"}
                        className="w-1/2 flex items-center justify-center"
                        onClick={() => setVehicleType("bus")}
                      >
                        <Bus className="mr-2 h-4 w-4" />
                        Bus
                      </Button>
                      <Button 
                        type="button"
                        variant={vehicleType === "train" ? "default" : "outline"}
                        className="w-1/2 flex items-center justify-center"
                        onClick={() => setVehicleType("train")}
                      >
                        <Train className="mr-2 h-4 w-4" />
                        Zug
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="route">Route</Label>
                    <Select onValueChange={setRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Route auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {getRoutes().map((route, index) => (
                          <SelectItem key={index} value={route}>
                            {route}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Datum</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
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
                    <Label htmlFor="position">Position</Label>
                    <Select 
                      defaultValue="Fahrer"
                      onValueChange={setPosition}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fahrer">Fahrer</SelectItem>
                        <SelectItem value="Co-Fahrer">Co-Fahrer</SelectItem>
                        <SelectItem value="Schaffner">Schaffner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select 
                      defaultValue="Standard"
                      onValueChange={setPriority}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hoch">Hoch</SelectItem>
                        <SelectItem value="Mittel">Mittel</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Hinweise</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Zusätzliche Hinweise zum Dienst" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="w-full md:w-auto">Dienstplan erstellen</Button>
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
            
            <TabsContent value="assign">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="user">Mitarbeiter</Label>
                  <Select onValueChange={setSelectedUser}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mitarbeiter auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {users.map((user, index) => (
                        <SelectItem key={index} value={user}>
                          {user}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Fahrzeugtyp</Label>
                    <div className="flex space-x-2">
                      <Button 
                        type="button"
                        variant={vehicleType === "bus" ? "default" : "outline"}
                        className="w-1/2 flex items-center justify-center"
                        onClick={() => setVehicleType("bus")}
                      >
                        <Bus className="mr-2 h-4 w-4" />
                        Bus
                      </Button>
                      <Button 
                        type="button"
                        variant={vehicleType === "train" ? "default" : "outline"}
                        className="w-1/2 flex items-center justify-center"
                        onClick={() => setVehicleType("train")}
                      >
                        <Train className="mr-2 h-4 w-4" />
                        Zug
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="route">Route</Label>
                    <Select onValueChange={setRoute}>
                      <SelectTrigger>
                        <SelectValue placeholder="Route auswählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {getRoutes().map((route, index) => (
                          <SelectItem key={index} value={route}>
                            {route}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="date">Datum</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4" />
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
                    <Label htmlFor="position">Position</Label>
                    <Select 
                      defaultValue="Fahrer"
                      onValueChange={setPosition}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Fahrer">Fahrer</SelectItem>
                        <SelectItem value="Co-Fahrer">Co-Fahrer</SelectItem>
                        <SelectItem value="Schaffner">Schaffner</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="priority">Priorität</Label>
                    <Select 
                      defaultValue="Standard"
                      onValueChange={setPriority}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Hoch">Hoch</SelectItem>
                        <SelectItem value="Mittel">Mittel</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Hinweise</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Zusätzliche Hinweise zum Dienst" 
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-4">
                  <Button type="submit" className="w-full md:w-auto">Mitarbeiter zuweisen</Button>
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

export default AdminDienstplaene;
