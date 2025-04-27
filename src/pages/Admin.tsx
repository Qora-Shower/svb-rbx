
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Settings, Clock, MessageSquare, Edit } from "lucide-react";
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
                  <Clock className="h-5 w-5" />
                  Shift Management
                </CardTitle>
                <CardDescription>Erstellung und Verwaltung von Shifts</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Erstelle und verwalte Shifts, lege Dienstpläne fest und koordiniere den Betrieb.
                </p>
                <Link to="/admin/shifts">
                  <Button variant="outline" className="w-full flex items-center justify-between">
                    <span>Shift erstellen</span>
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-all">
              <CardHeader className="bg-purple-50">
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Mitteilungen
                </CardTitle>
                <CardDescription>Mitteilungen und Ankündigungen</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Erstelle wichtige Mitteilungen für Admins oder alle Benutzer.
                </p>
                <Link to="/admin/mitteilungen">
                  <Button variant="outline" className="w-full">
                    Mitteilung erstellen
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-all">
              <CardHeader className="bg-green-50">
                <CardTitle className="flex items-center gap-2">
                  <Edit className="h-5 w-5" />
                  Blog
                </CardTitle>
                <CardDescription>Blog-Einträge verwalten</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 pb-4">
                <p className="text-gray-600 mb-4">
                  Erstelle und verwalte Blog-Einträge für alle Benutzer.
                </p>
                <Link to="/blog/create">
                  <Button variant="outline" className="w-full">
                    Blog-Eintrag erstellen
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
