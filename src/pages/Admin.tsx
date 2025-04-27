
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Settings, Users, Calendar, MessageSquare, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";

const Admin = () => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 text-gray-900 flex items-center gap-2">
              <Settings className="h-8 w-8" />
              Admin-Bereich
            </h1>
            <p className="text-gray-600">
              Willkommen im Administrationsbereich, {user.username}. Hier kannst du verschiedene Verwaltungsaufgaben durchführen.
            </p>
          </div>
          
          <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Dienstpläne verwalten
                </CardTitle>
                <CardDescription>Erstellung und Bearbeitung von Dienstplänen</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Erstelle, bearbeite und verwalte Dienstpläne für alle Mitarbeiter.
                  Weise Schichten zu und behalte den Überblick über die personelle Besetzung.
                </p>
                <Link to="/admin/dienstplaene">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Dienstpläne öffnen</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Benutzerverwaltung
                </CardTitle>
                <CardDescription>Übersicht und Verwaltung aller Benutzer</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Verwalte alle Benutzerkonten, weise Berechtigungen zu und bearbeite Benutzerprofile.
                  Überwache Aktivitäten und setze Passwörter zurück.
                </p>
                <Link to="/admin/users">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Benutzer verwalten</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Mitteilungen
                </CardTitle>
                <CardDescription>Nachrichten und Ankündigungen</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Erstelle wichtige Mitteilungen und Ankündigungen für Mitarbeiter und Benutzer.
                  Verwalte alle Benachrichtigungen an einem zentralen Ort.
                </p>
                <Link to="/admin/mitteilungen">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Mitteilungen verwalten</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
