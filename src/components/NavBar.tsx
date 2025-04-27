
import { useState } from 'react';
import { Menu, Home, Newspaper, GalleryHorizontal, LogIn, Clock, Shield, FileText, Calendar, Settings, Users } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const menuItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'News', href: '/news', icon: Newspaper },
    { name: 'Blog', href: '/blog', icon: Newspaper },
    { name: 'Galerie', href: '/galerie', icon: GalleryHorizontal },
    { name: 'Shift', href: '/shift', icon: Clock },
    { name: 'Timetable', href: '/timetable', icon: Calendar },
    { name: 'TOS', href: '/tos', icon: Shield },
    { name: 'Privacy Policy', href: '/privacy', icon: FileText },
  ];

  const adminMenuItems = user ? [
    { name: 'Dienstplan', href: '/dienstplan', icon: Calendar },
    { name: 'Admin', href: '/admin', icon: Settings },
  ] : [];

  const allMenuItems = [...menuItems, ...adminMenuItems];

  return (
    <nav className="fixed w-full bg-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" className="p-2">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] bg-white">
                <div className="mt-6 flex flex-col gap-4">
                  {allMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center gap-2 hover:bg-gray-100 px-4 py-2 rounded-lg transition-colors duration-200 font-ubuntu ${item.name === 'Admin' ? 'text-purple-600 font-semibold' : ''}`}
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className={`h-5 w-5 ${item.name === 'Admin' ? 'text-purple-600' : ''}`} />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <Link to="/" className="text-black font-bold text-xl">SVB & MBU Roblox</Link>
          </div>
          {user ? (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="flex items-center gap-2 hover:bg-red-500 hover:text-white border-red-500 text-black"
                  >
                    <Users className="h-5 w-5" />
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link to="/settings">
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      <span>Einstellungen</span>
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={logout}>
                    <LogIn className="h-4 w-4 mr-2 rotate-180" />
                    <span>Abmelden</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2 hover:bg-[#33C3F0] hover:text-white border-[#33C3F0]">
                <LogIn className="h-5 w-5" />
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
