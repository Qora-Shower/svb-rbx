
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Tos = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Shield className="h-8 w-8" />
            Nutzungsbedingungen
          </h1>
          
          <div className="max-w-full">
            <p className="text-lg mb-6">
              Diese Nutzungsbedingungen regeln Ihre Nutzung unseres SVB & MBU Roblox Bus Shift Spiels. Bitte lesen Sie diese sorgfältig.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Akzeptanz der Nutzungsbedingungen</h2>
            <p className="mb-4">
              Durch die Nutzung unseres Spiels akzeptieren Sie diese Bedingungen in vollem Umfang. Wenn Sie mit diesen Bedingungen nicht einverstanden sind, dürfen Sie unser Spiel nicht nutzen.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Änderungen der Bedingungen</h2>
            <p className="mb-4">
              Wir behalten uns das Recht vor, diese Nutzungsbedingungen jederzeit zu ändern. Solche Änderungen treten sofort nach ihrer Veröffentlichung in Kraft. Ihre fortgesetzte Nutzung des Spiels nach solchen Änderungen stellt Ihre Zustimmung zu diesen Änderungen dar.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Spielregeln</h2>
            <p className="mb-4">
              Als Spieler müssen Sie die festgelegten Spielregeln einhalten. Diese umfassen, sind aber nicht beschränkt auf:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Respektvoller Umgang mit anderen Spielern</li>
              <li>Keine Belästigung, Beleidigung oder Einschüchterung anderer Spieler</li>
              <li>Keine Verwendung von Cheats oder Hacks</li>
              <li>Einhaltung der virtuellen Verkehrsregeln im Spiel</li>
              <li>Keine absichtliche Störung des Spielablaufs</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Konten und Sicherheit</h2>
            <p className="mb-4">
              Sie sind für die Sicherheit Ihres Kontos verantwortlich. Teilen Sie niemals Ihre Anmeldeinformationen mit anderen. Wir sind nicht verantwortlich für Verluste, die durch den Zugriff Dritter auf Ihr Konto entstehen.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Inhalte und geistiges Eigentum</h2>
            <p className="mb-4">
              Alle Inhalte des Spiels, einschließlich, aber nicht beschränkt auf Text, Grafiken, Logos, Icons, Bilder, Audio- und Videoaufnahmen, digitale Downloads und Software, sind Eigentum von SVB & MBU Roblox oder seinen Lizenzgebern und durch Urheberrechtsgesetze und internationale Verträge geschützt.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Verhaltenscode</h2>
            <p className="mb-4">
              Sie verpflichten sich, bei der Nutzung unseres Spiels die folgenden Grundsätze zu beachten:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Respekt gegenüber anderen Spielern und Mitarbeitern</li>
              <li>Ehrlichkeit und Fairness im Spiel</li>
              <li>Einhaltung aller anwendbaren Gesetze und Vorschriften</li>
              <li>Keine Verbreitung von schädlichen, beleidigenden oder rechtswidrigen Inhalten</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Haftungsausschluss</h2>
            <p className="mb-4">
              Unser Spiel wird "wie es ist" und "wie verfügbar" angeboten, ohne jegliche ausdrückliche oder implizite Gewährleistung. Wir übernehmen keine Garantie für die Verfügbarkeit, Zuverlässigkeit oder Fehlerfreiheit des Spiels.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Haftungsbeschränkung</h2>
            <p className="mb-4">
              In keinem Fall haftet SVB & MBU Roblox für direkte, indirekte, zufällige, besondere oder Folgeschäden, die aus der Nutzung oder der Unmöglichkeit der Nutzung unseres Spiels entstehen.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">9. Roblox-Plattform</h2>
            <p className="mb-4">
              Da unser Spiel auf der Roblox-Plattform gehostet wird, gelten zusätzlich zu unseren eigenen Nutzungsbedingungen auch die Nutzungsbedingungen von Roblox. Bitte beachten Sie diese ebenfalls.
            </p>
            
            <div className="mt-8">
              <a href="https://www.roblox.com/info/terms" target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
                  <ExternalLink className="h-5 w-5" />
                  Roblox Nutzungsbedingungen
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Tos;
