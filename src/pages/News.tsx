
import NavBar from "@/components/NavBar";
import { Newspaper } from "lucide-react";

const News = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Newspaper className="h-8 w-8" />
            Neuigkeiten
          </h1>
          
          <div className="space-y-8">
            {newsItems.map((item, index) => (
              <div key={index} className="border-b pb-6 mb-6 last:border-0">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <p className="text-gray-500 mb-4">{item.date}</p>
                <p className="text-gray-800">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Sample news data
const newsItems = [
  {
    title: "Neue Buslinien eingeführt",
    date: "26. April 2025",
    content: "Wir freuen uns, die Einführung von fünf neuen Buslinien bekannt zu geben. Diese neuen Routen werden den Zugang zu wichtigen Gebieten verbessern. Die Änderungen treten ab nächster Woche in Kraft. Bitte prüfen Sie den aktualisierten Fahrplan für weitere Details."
  },
  {
    title: "Server-Wartung am Wochenende",
    date: "24. April 2025",
    content: "Am kommenden Wochenende wird eine Server-Wartung durchgeführt. Während dieser Zeit kann es zu vorübergehenden Ausfällen kommen. Wir bitten um Ihr Verständnis und werden so schnell wie möglich wieder online sein."
  },
  {
    title: "Neues Belohnungssystem",
    date: "20. April 2025",
    content: "Wir haben ein neues Belohnungssystem für aktive Busfahrer eingeführt. Je mehr Stunden Sie fahren, desto mehr Punkte sammeln Sie, die gegen exklusive In-Game-Items eingetauscht werden können. Melden Sie sich noch heute an und beginnen Sie zu sammeln!"
  },
  {
    title: "Fehlerbehebungs-Update",
    date: "15. April 2025",
    content: "Das neueste Update behebt mehrere gemeldete Fehler und verbessert die Gesamtstabilität des Spiels. Einige der Hauptkorrekturen betreffen die Fahrzeugphysik, Serververbindungsprobleme und die Benutzeroberfläche. Bitte aktualisieren Sie Ihre Spielversion."
  },
  {
    title: "Gemeinschafts-Event im Mai",
    date: "10. April 2025",
    content: "Markieren Sie den 15. Mai in Ihren Kalendern! Wir organisieren ein großes Gemeinschafts-Event mit Spielen, Wettbewerben und Preisen. Alle Spieler sind willkommen. Weitere Details werden in Kürze bekannt gegeben."
  },
  {
    title: "Rekrutierung neuer Teammitglieder",
    date: "5. April 2025",
    content: "Wir suchen engagierte Spieler, die dem Moderationsteam beitreten möchten. Wenn Sie Erfahrung und eine Leidenschaft für unser Spiel haben, füllen Sie bitte das Bewerbungsformular auf unserer Discord aus."
  },
  {
    title: "Neue Karten in Arbeit",
    date: "1. April 2025",
    content: "Unser Entwicklungsteam arbeitet fleißig an neuen Karten, die in den kommenden Monaten veröffentlicht werden. Diese werden neue Herausforderungen und Umgebungen mit einzigartigen Landschaften bieten."
  },
  {
    title: "Änderungen an den Verkehrsregeln",
    date: "25. März 2025",
    content: "Wir haben die Verkehrsregeln aktualisiert, um ein realistischeres Fahrerlebnis zu bieten. Bitte machen Sie sich mit den neuen Regeln vertraut, da Sie für Verstöße verwarnt werden können."
  }
];

export default News;
