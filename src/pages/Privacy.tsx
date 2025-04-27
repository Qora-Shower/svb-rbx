
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { FileText, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <FileText className="h-8 w-8" />
            Datenschutzrichtlinie
          </h1>
          
          <div className="max-w-full">
            <p className="text-lg mb-6">
              Diese Datenschutzrichtlinie erläutert, wie wir Ihre Daten erheben, verwenden und schützen, wenn Sie unser SVB & MBU Roblox Bus Shift Spiel nutzen.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">1. Welche Daten wir sammeln</h2>
            <p className="mb-4">
              Wir können die folgenden Arten von Daten sammeln, speichern und verarbeiten:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Ihre Roblox-Benutzer-ID und Ihren Benutzernamen</li>
              <li>Spielaktivitäten und -statistiken (wie gespielte Zeit, abgeschlossene Routen)</li>
              <li>Chat-Protokolle innerhalb des Spiels für Moderationszwecke</li>
              <li>Informationen über Ihre Spielsitzungen (wie Verbindungszeiten, genutzte Geräte)</li>
              <li>Feedback und Support-Anfragen, die Sie einreichen</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">2. Wie wir Ihre Daten verwenden</h2>
            <p className="mb-4">
              Wir verwenden Ihre Daten für die folgenden Zwecke:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Um das Spiel zu betreiben und zu verbessern</li>
              <li>Um Ihren Spielfortschritt zu speichern und wiederherzustellen</li>
              <li>Um Support und Hilfe bei technischen Problemen zu leisten</li>
              <li>Um unsere Spielregeln durchzusetzen und Missbrauch zu verhindern</li>
              <li>Um Ihnen relevante Neuigkeiten und Updates über das Spiel mitzuteilen</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">3. Datenschutz von Kindern</h2>
            <p className="mb-4">
              Wir sammeln wissentlich keine persönlich identifizierbaren Informationen von Kindern unter 13 Jahren ohne elterliche Zustimmung. Wenn Sie der Meinung sind, dass wir versehentlich Daten von Kindern unter 13 Jahren gesammelt haben, kontaktieren Sie uns bitte, damit wir die notwendigen Maßnahmen ergreifen können.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">4. Datensicherheit</h2>
            <p className="mb-4">
              Wir haben angemessene Sicherheitsmaßnahmen implementiert, um Ihre Daten vor unbefugtem Zugriff, Veränderung, Offenlegung oder Zerstörung zu schützen. Trotz unserer Bemühungen kann keine Methode der Übertragung über das Internet oder der elektronischen Speicherung als 100% sicher garantiert werden.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">5. Datenaufbewahrung</h2>
            <p className="mb-4">
              Wir bewahren Ihre Daten nur so lange auf, wie es für die Zwecke, für die sie gesammelt wurden, erforderlich ist, oder wie es gesetzlich vorgeschrieben ist. Wenn Sie Ihr Konto löschen, werden bestimmte Daten möglicherweise für einen begrenzten Zeitraum in unseren Sicherungssystemen aufbewahrt.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">6. Ihre Rechte</h2>
            <p className="mb-4">
              Je nach Ihrer Gerichtsbarkeit haben Sie möglicherweise bestimmte Rechte in Bezug auf Ihre persönlichen Daten, darunter:
            </p>
            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Das Recht, auf Ihre Daten zuzugreifen und eine Kopie zu erhalten</li>
              <li>Das Recht, Ihre Daten zu berichtigen oder zu aktualisieren</li>
              <li>Das Recht, die Löschung Ihrer Daten zu verlangen</li>
              <li>Das Recht, der Verarbeitung Ihrer Daten zu widersprechen oder sie einzuschränken</li>
              <li>Das Recht auf Datenübertragbarkeit</li>
            </ul>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">7. Änderungen an dieser Datenschutzrichtlinie</h2>
            <p className="mb-4">
              Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wenn wir wesentliche Änderungen vornehmen, werden wir Sie durch eine Benachrichtigung im Spiel oder durch andere angemessene Mittel informieren.
            </p>
            
            <h2 className="text-2xl font-bold mt-8 mb-4">8. Roblox-Datenschutzrichtlinie</h2>
            <p className="mb-4">
              Da unser Spiel auf der Roblox-Plattform gehostet wird, unterliegen Sie auch der Datenschutzrichtlinie von Roblox. Bitte lesen Sie diese für weitere Informationen über die Datenerfassungspraktiken von Roblox.
            </p>
            
            <div className="mt-8">
              <a href="https://www.roblox.com/info/privacy" target="_blank" rel="noopener noreferrer">
                <Button className="flex items-center gap-2 hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
                  <ExternalLink className="h-5 w-5" />
                  Roblox Datenschutzrichtlinie
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

export default Privacy;
