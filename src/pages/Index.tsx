
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Users, ExternalLink, Discord } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Index = () => {
  const { user } = useAuth();
  
  const openDiscord = () => {
    window.open("https://discord.com/channels/1358033580068044811/1358033581720600724", "_blank");
  };

  const openRobloxGroup = () => {
    window.open("https://www.roblox.com/de/communities/34151062/S-dtiroler-Verkehrsbetriebe#!/about", "_blank");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        {/* Hero section */}
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900">Willkommen bei SVB & MBU Roblox</h1>
          <p className="text-lg text-gray-600 mb-8">
            Entdecke die Welt des virtuellen öffentlichen Verkehrs in unserem Roblox-Spiel. 
            Werde ein Teil unserer Gemeinschaft und erlebe realistisches Busfahren und Zugbetrieb.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {user && (
              <Link to="/dienstplan" className="col-span-1 md:col-span-3">
                <Button className="w-full flex justify-between items-center hover:bg-orange-500 hover:text-white border-orange-500" variant="outline">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Dienstplan anzeigen</span>
                  </div>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </Link>
            )}
            
            <Link to="/timetable" className="col-span-1">
              <Button className="w-full flex justify-between items-center hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>Fahrpläne</span>
                </div>
                <ExternalLink className="h-4 w-4" />
              </Button>
            </Link>
            
            <Button 
              onClick={openRobloxGroup}
              className="w-full flex justify-between items-center hover:bg-[#33C3F0] border-[#33C3F0]" 
              variant="outline"
            >
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span>Roblox Gruppe</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
            
            <Button 
              onClick={openDiscord}
              className="w-full flex justify-between items-center hover:bg-[#33C3F0] border-[#33C3F0]" 
              variant="outline"
            >
              <div className="flex items-center">
                <Discord className="h-5 w-5 mr-2" />
                <span>Discord beitreten</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Cards Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardHeader className="bg-blue-50">
              <CardTitle>Fahrpläne</CardTitle>
              <CardDescription>Entdecke alle Bus- und Zugverbindungen</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Informiere dich über alle verfügbaren Routen, Abfahrtszeiten und aktuelle Baustellen in unserem Verkehrsnetz.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/timetable" className="w-full">
                <Button className="w-full">Fahrpläne anzeigen</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-green-50">
              <CardTitle>Shifts</CardTitle>
              <CardDescription>Nimm an geplanten Betriebszeiten teil</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Finde die nächsten geplanten Fahrten und melde dich als Fahrer an oder sei als Fahrgast dabei.
              </p>
            </CardContent>
            <CardFooter>
              <Link to="/shift" className="w-full">
                <Button className="w-full">Shifts anzeigen</Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader className="bg-purple-50">
              <CardTitle>Community</CardTitle>
              <CardDescription>Werde Teil unserer Gemeinschaft</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-gray-600">
                Tritt unserer Discord-Community bei und tausche dich mit anderen Spielern aus. Erfahre Neuigkeiten und Updates direkt von unserem Team.
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={openDiscord}>
                Discord Server
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
