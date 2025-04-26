
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 font-ubuntu flex flex-col">
      <NavBar />
      <main className="pt-20 px-4 max-w-7xl mx-auto flex-grow">
        <div className="bg-white rounded-xl p-6 mt-8 shadow-sm">
          <h1 className="text-4xl font-bold mb-8 text-gray-900">Willkommen bei SVB & MBU Roblox</h1>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/timetable">
              <Button className="flex items-center gap-2 hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
                <Calendar className="h-5 w-5" />
                Timetable
              </Button>
            </Link>
            <Button className="flex items-center gap-2 hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
              <Users className="h-5 w-5" />
              Join Group
            </Button>
            <Button className="flex items-center gap-2 hover:bg-[#33C3F0] border-[#33C3F0]" variant="outline">
              <Users className="h-5 w-5" />
              Join Discord
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
