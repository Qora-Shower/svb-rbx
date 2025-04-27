
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import News from "./pages/News";
import Blog from "./pages/Blog";
import Galerie from "./pages/Galerie";
import Shift from "./pages/Shift";
import Timetable from "./pages/Timetable";
import RouteDetail from "./pages/RouteDetail";
import Schedule from "./pages/Schedule";
import Tos from "./pages/Tos";
import Privacy from "./pages/Privacy";
import Login from "./pages/Login";
import Dienstplan from "./pages/Dienstplan";
import Admin from "./pages/Admin";
import AdminMitteilungen from "./pages/AdminMitteilungen";
import AdminDienstplaene from "./pages/AdminDienstplaene";
import AdminShifts from "./pages/AdminShifts";
import AdminNews from "./pages/AdminNews";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/news" element={<News />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/galerie" element={<Galerie />} />
            <Route path="/shift" element={<Shift />} />
            <Route path="/timetable" element={<Timetable />} />
            <Route path="/timetable/:id" element={<RouteDetail />} />
            <Route path="/timetable/:id/schedule" element={<Schedule />} />
            <Route path="/tos" element={<Tos />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dienstplan" element={<Dienstplan />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/mitteilungen" element={<AdminMitteilungen />} />
            <Route path="/admin/dienstplaene" element={<AdminDienstplaene />} />
            <Route path="/admin/shifts" element={<AdminShifts />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
