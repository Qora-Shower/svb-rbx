
import NavBar from "@/components/NavBar";
import { Newspaper } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 flex items-center gap-2">
            <Newspaper className="h-8 w-8" />
            Blog
          </h1>
          
          <div className="space-y-12">
            {blogPosts.map((post, index) => (
              <article key={index} className="border-b pb-8 last:border-0">
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <div className="flex items-center gap-2 text-gray-500 mb-4">
                  <span>{post.author}</span> • <span>{post.date}</span>
                </div>
                {post.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className="text-gray-800 mb-4">{paragraph}</p>
                ))}
                <div className="mt-4">
                  {post.tags.map((tag, tIndex) => (
                    <span key={tIndex} className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm mr-2 mb-2">
                      #{tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Sample blog data
const blogPosts = [
  {
    title: "Ein Tag im Leben eines SVB Busfahrers",
    author: "Max Mustermann",
    date: "25. April 2025",
    tags: ["Erfahrung", "Busfahrer", "Alltag"],
    content: [
      "Morgens um 5 Uhr beginnt mein Tag als SVB Busfahrer. Die frühen Morgenstunden sind ruhig und geben mir Zeit, mich mental auf den Tag vorzubereiten. Mein erster Schritt ist immer die Fahrzeuginspektion, um sicherzustellen, dass alles einwandfrei funktioniert.",
      "Während meiner Schicht erlebe ich die Stadt in all ihren verschiedenen Momenten. Von der Morgenhektik über die ruhige Mittagszeit bis hin zum Nachmittagsverkehr. Jeder Moment bringt seine eigenen Herausforderungen und Freuden mit sich.",
      "Die Interaktion mit den Fahrgästen macht meinen Job besonders interessant. Jeden Tag treffe ich neue Leute und höre verschiedene Geschichten. Diese menschlichen Begegnungen sind der Grund, warum ich meinen Beruf so sehr liebe.",
      "Nach einer 8-stündigen Schicht kehre ich zum Depot zurück, um meinen Bus zu parken und mich für den nächsten Tag vorzubereiten. Es ist ein anstrengender, aber erfüllender Beruf, der mir das Gefühl gibt, einen wichtigen Beitrag für die Gemeinschaft zu leisten."
    ]
  },
  {
    title: "Die Geschichte des öffentlichen Nahverkehrs in unserer Stadt",
    author: "Laura Schmidt",
    date: "20. April 2025",
    tags: ["Geschichte", "ÖPNV", "Stadtentwicklung"],
    content: [
      "Der öffentliche Nahverkehr in unserer Stadt hat eine lange und faszinierende Geschichte. Alles begann im frühen 20. Jahrhundert mit den ersten Straßenbahnen, die von Pferden gezogen wurden. Diese primitive Form des öffentlichen Verkehrs revolutionierte die Art und Weise, wie die Menschen sich in der Stadt bewegten.",
      "In den 1930er Jahren wurden die ersten motorisierten Busse eingeführt, die allmählich die Straßenbahnen ersetzten. Diese Modernisierung ermöglichte es, mehr Gebiete zu erreichen und den Service zu verbessern. Die Busflotte wuchs stetig und wurde zu einem wesentlichen Bestandteil des städtischen Lebens.",
      "Die 1970er Jahre brachten eine Periode der Expansion mit sich, als neue Routen hinzugefügt und bestehende erweitert wurden. Dies fiel mit dem Wachstum der Vorstädte zusammen und machte den öffentlichen Verkehr für noch mehr Menschen zugänglich.",
      "Heute steht unser öffentlicher Nahverkehrssystem vor neuen Herausforderungen, wie Umweltbedenken und steigende Betriebskosten. Trotz dieser Herausforderungen bleibt es ein wesentlicher Dienst, der täglich tausende Menschen befördert und einen Beitrag zu einer nachhaltigeren Stadt leistet."
    ]
  },
  {
    title: "Technologische Innovationen im modernen Busverkehr",
    author: "Thomas Weber",
    date: "15. April 2025",
    tags: ["Technologie", "Innovation", "Zukunft"],
    content: [
      "Die technologischen Fortschritte der letzten Jahre haben den Busverkehr grundlegend verändert. Von Echtzeit-Tracking-Systemen bis hin zu umweltfreundlichen Elektrobussen – die Branche erlebt eine wahre Revolution.",
      "Ein besonders bemerkenswerter Fortschritt ist die Integration künstlicher Intelligenz in Verkehrsmanagementsysteme. Diese Technologie optimiert Routen basierend auf Verkehrsaufkommen und Nachfrage, was zu effizienteren Diensten und kürzeren Wartezeiten führt.",
      "Elektrobusse sind ein weiterer wichtiger Trend. Mit dem wachsenden Bewusstsein für Umweltprobleme setzen immer mehr Städte auf diese umweltfreundliche Alternative. Diese Busse reduzieren nicht nur die Emissionen, sondern bieten auch einen leiseren und komfortableren Service.",
      "Die Zukunft des Busverkehrs scheint noch aufregendere Innovationen zu versprechen. Autonome Busse werden bereits getestet und könnten in naher Zukunft Realität werden. Diese Fahrzeuge könnten den öffentlichen Verkehr noch sicherer und effizienter machen."
    ]
  }
];

export default Blog;
