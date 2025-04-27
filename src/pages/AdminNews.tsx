
import React, { useState } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Newspaper, Calendar } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Import the NewsContext to share news across components
import { useNewsContext } from "@/contexts/NewsContext";

const AdminNews = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addNews } = useNewsContext();
  
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [audience, setAudience] = useState<"all" | "admins">("all");
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Sample admin news data - in a real app this would come from a database
  const adminNews = [
    {
      title: "Wichtige Änderungen im Dienstplan",
      author: "SystemAdmin",
      date: "27. April 2025",
      content: "Aufgrund technischer Wartungsarbeiten wurden einige Dienstpläne für die kommende Woche angepasst. Bitte überprüfe deinen Dienstplan regelmäßig auf Änderungen. Bei Fragen wende dich bitte an den zuständigen Dienstplaner."
    },
    {
      title: "Neue Funktionen im Administrationsbereich",
      author: "TechSupport",
      date: "25. April 2025",
      content: "Wir haben den Administrationsbereich um neue Funktionen erweitert. Ab sofort können Mitteilungen direkt an bestimmte Benutzergruppen gesendet werden. Außerdem wurde die Dienstplanerstellung vereinfacht und bietet nun mehr Optionen für wiederkehrende Dienste."
    },
    {
      title: "Schulung für neues Liniennetz",
      author: "Schulungsleiter",
      date: "20. April 2025",
      content: "Am kommenden Samstag findet eine Schulung für das neue Liniennetz statt. Alle Administratoren werden gebeten, daran teilzunehmen, um sich mit den neuen Routen und Fahrplänen vertraut zu machen. Die Schulung beginnt um 10:00 Uhr und endet voraussichtlich um 14:00 Uhr."
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !content) {
      toast({
        title: "Fehler",
        description: "Bitte fülle alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }
    
    // Create the news item
    const newsItem = {
      id: Date.now().toString(),
      title,
      content,
      author: user.username,
      date: format(new Date(), "dd. MMMM yyyy"),
      eventDate: eventDate ? format(eventDate, "dd. MMMM yyyy") : undefined,
      audience
    };
    
    // Add to context (which will propagate to News page)
    addNews(newsItem);
    
    toast({
      title: "Mitteilung erstellt",
      description: `Die Mitteilung "${title}" wurde erfolgreich erstellt.`,
    });
    
    // Reset form
    setTitle("");
    setContent("");
    setAudience("all");
    setEventDate(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <Newspaper className="h-8 w-8" />
              Admin-Mitteilungen
            </h1>
          </div>
          
          <Tabs defaultValue="create" className="w-full mb-8">
            <TabsList className="mb-6">
              <TabsTrigger value="create">Neue Mitteilung</TabsTrigger>
              <TabsTrigger value="view">Vorhandene Mitteilungen</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create">
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <label htmlFor="title" className="font-medium">Überschrift</label>
                      <Input 
                        id="title" 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titel der Mitteilung"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="content" className="font-medium">Inhalt</label>
                      <Textarea 
                        id="content" 
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Inhalt der Mitteilung"
                        rows={6}
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="audience" className="font-medium">Zielgruppe</label>
                        <Select 
                          value={audience} 
                          onValueChange={(value: "all" | "admins") => setAudience(value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Zielgruppe auswählen" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">Alle Benutzer</SelectItem>
                            <SelectItem value="admins">Nur Administratoren</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="font-medium">Eventuelles Datum (optional)</label>
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
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="view">
              <div className="space-y-8">
                {adminNews.length > 0 ? (
                  adminNews.map((item, index) => (
                    <div key={index} className="border-b pb-6 mb-6 last:border-0">
                      <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                      <p className="text-gray-500 mb-4">{item.author} • {item.date}</p>
                      <p className="text-gray-800">{item.content}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center p-12 bg-gray-50 rounded-lg border">
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Mitteilungen</h3>
                    <p className="text-gray-600">
                      Es sind derzeit keine Admin-Mitteilungen vorhanden.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminNews;
