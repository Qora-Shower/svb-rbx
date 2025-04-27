
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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

const AdminMitteilungen = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [target, setTarget] = useState("players"); // "players" or "admins"
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, we would save the notification data to a database
    // For now, we just show a success message and redirect
    
    toast({
      title: "Mitteilung erstellt",
      description: `Die Mitteilung "${title}" wurde erfolgreich erstellt.`,
    });
    
    if (target === "players") {
      navigate("/news");
    } else {
      navigate("/admin");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <MessageSquare className="h-8 w-8" />
            Mitteilung erstellen
          </h1>
          <p className="text-gray-600 mb-8">
            Erstelle eine neue Mitteilung für Spieler oder Administratoren.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Überschrift</Label>
              <Input 
                id="title" 
                placeholder="Titel der Mitteilung" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="content">Inhalt</Label>
              <Textarea 
                id="content" 
                placeholder="Text der Mitteilung" 
                rows={5}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                className="min-h-[200px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Eventuelles Datum (optional)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !eventDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {eventDate ? format(eventDate, "dd.MM.yyyy") : <span>Datum auswählen</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={eventDate}
                    onSelect={setEventDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Zielgruppe</Label>
              <RadioGroup 
                defaultValue="players" 
                className="flex gap-4"
                onValueChange={(value) => setTarget(value)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="players" id="players" />
                  <Label htmlFor="players">Alle Spieler</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admins" id="admins" />
                  <Label htmlFor="admins">Nur Administratoren</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="flex gap-4">
              <Button type="submit" className="w-full md:w-auto">Mitteilung erstellen</Button>
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminMitteilungen;
