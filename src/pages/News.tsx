
import React from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Newspaper, Calendar, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNewsContext } from "@/contexts/NewsContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const News = () => {
  const { user } = useAuth();
  const { news, adminNews } = useNewsContext();
  const navigate = useNavigate();
  
  const hasAdminNews = user && adminNews.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-2">
              <Newspaper className="h-8 w-8" />
              Neuigkeiten
            </h1>
            
            {hasAdminNews && (
              <Button 
                variant="outline"
                className="flex items-center gap-2 border-red-500 text-red-500 hover:bg-red-50"
                onClick={() => navigate("/admin/news")}
              >
                Admin News
                <span className="inline-flex items-center justify-center bg-red-100 text-red-600 rounded-full w-6 h-6 text-xs font-bold">
                  {adminNews.length}
                </span>
              </Button>
            )}
          </div>
          
          <div className="space-y-8">
            {news.length > 0 ? (
              news.map((item) => (
                <div key={item.id} className="border-b pb-6 mb-6 last:border-0">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <p className="text-gray-500 mb-4">{item.author} • {item.date}</p>
                  {item.eventDate && (
                    <div className="flex items-center text-blue-600 mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span className="text-sm">{item.eventDate}</span>
                    </div>
                  )}
                  <p className="text-gray-800">{item.content}</p>
                </div>
              ))
            ) : (
              <div className="text-center p-12 bg-gray-50 rounded-lg border">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Keine Neuigkeiten</h3>
                <p className="text-gray-600">
                  Es sind derzeit keine Neuigkeiten vorhanden.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default News;
