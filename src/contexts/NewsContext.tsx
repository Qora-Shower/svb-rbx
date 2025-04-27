
import React, { createContext, useContext, useState, useEffect } from "react";

// Type definitions for news items
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  eventDate?: string;
  audience: "all" | "admins";
}

// Define the context type
interface NewsContextType {
  news: NewsItem[];
  adminNews: NewsItem[];
  addNews: (newsItem: NewsItem) => void;
  deleteNews: (id: string) => void;
}

// Initial sample news data
const initialNews: NewsItem[] = [
  {
    id: "1",
    title: "Neue Buslinien im Stadtgebiet",
    content: "Ab dem kommenden Monat werden neue Buslinien im Stadtgebiet eingeführt. Die Linien 301 und 302 werden das Angebot im Norden der Stadt verbessern.",
    author: "Verkehrsplaner",
    date: "27. April 2025",
    audience: "all"
  },
  {
    id: "2",
    title: "Wartungsarbeiten an Bushaltestellen",
    content: "In den kommenden Wochen werden an verschiedenen Haltestellen im Stadtgebiet Wartungsarbeiten durchgeführt. Einige Haltestellen könnten temporär verlegt werden.",
    author: "Technischer Dienst",
    date: "25. April 2025",
    audience: "all"
  }
];

// Initial sample admin news data
const initialAdminNews: NewsItem[] = [
  {
    id: "3",
    title: "Wichtige Änderungen im Dienstplan",
    content: "Aufgrund technischer Wartungsarbeiten wurden einige Dienstpläne für die kommende Woche angepasst. Bitte überprüfe deinen Dienstplan regelmäßig auf Änderungen.",
    author: "SystemAdmin",
    date: "27. April 2025",
    audience: "admins"
  },
  {
    id: "4",
    title: "Neue Funktionen im Administrationsbereich",
    content: "Wir haben den Administrationsbereich um neue Funktionen erweitert. Ab sofort können Mitteilungen direkt an bestimmte Benutzergruppen gesendet werden.",
    author: "TechSupport",
    date: "25. April 2025",
    audience: "admins"
  }
];

// Create the context
const NewsContext = createContext<NewsContextType | null>(null);

// Provider component
export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>(() => {
    const savedNews = localStorage.getItem("news");
    return savedNews ? JSON.parse(savedNews) : initialNews;
  });
  
  const [adminNews, setAdminNews] = useState<NewsItem[]>(() => {
    const savedAdminNews = localStorage.getItem("adminNews");
    return savedAdminNews ? JSON.parse(savedAdminNews) : initialAdminNews;
  });
  
  // Save to localStorage whenever news changes
  useEffect(() => {
    localStorage.setItem("news", JSON.stringify(news));
    localStorage.setItem("adminNews", JSON.stringify(adminNews));
  }, [news, adminNews]);

  const addNews = (newsItem: NewsItem) => {
    if (newsItem.audience === "admins") {
      setAdminNews(prev => [newsItem, ...prev]);
    } else {
      setNews(prev => [newsItem, ...prev]);
    }
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(item => item.id !== id));
    setAdminNews(prev => prev.filter(item => item.id !== id));
  };

  return (
    <NewsContext.Provider value={{ news, adminNews, addNews, deleteNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// Hook to use the news context
export const useNewsContext = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNewsContext must be used within a NewsProvider");
  }
  return context;
};
