import { Link } from "react-router-dom";
import { Shield, FileText, ExternalLink, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const openDiscord = () => {
    window.open("https://discord.com/channels/1358033580068044811/1358033581720600724", "_blank");
  };

  const openRobloxGroup = () => {
    window.open("https://www.roblox.com/de/communities/34151062/S-dtiroler-Verkehrsbetriebe#!/about", "_blank");
  };

  return (
    <footer className="bg-white border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-bold text-xl mb-4">SVB & MBU Roblox</h2>
            <p className="text-gray-600 mb-4">
              Erlebe die Realität des öffentlichen Verkehrs in einer virtuellen Welt.
              Fahre Busse und Züge, entdecke realistische Routen und werde Teil unserer Gemeinschaft.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2" 
                onClick={openRobloxGroup}
              >
                <ExternalLink className="h-4 w-4" />
                Roblox
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2" 
                onClick={openDiscord}
              >
                <Users className="h-4 w-4" />
                Discord
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
              </li>
              <li>
                <Link to="/news" className="text-gray-600 hover:text-gray-900">News</Link>
              </li>
              <li>
                <Link to="/timetable" className="text-gray-600 hover:text-gray-900">Fahrpläne</Link>
              </li>
              <li>
                <Link to="/shift" className="text-gray-600 hover:text-gray-900">Shifts</Link>
              </li>
              <li>
                <Link to="/galerie" className="text-gray-600 hover:text-gray-900">Galerie</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-4">Rechtliches</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/tos" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  <span>Nutzungsbedingungen</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>Datenschutzerklärung</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">&copy; {currentYear} SVB & MBU Roblox. Alle Rechte vorbehalten.</p>
          <p className="text-gray-500 text-sm mt-2 md:mt-0">
            Diese Webseite ist nicht mit Roblox Corporation verbunden.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
