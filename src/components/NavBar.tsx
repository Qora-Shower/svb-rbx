
import { useState } from 'react';
import { Menu, Home, News, Blog, Gallery, LogIn } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Home', href: '#', icon: Home },
    { name: 'News', href: '#news', icon: News },
    { name: 'Blog', href: '#blog', icon: Blog },
    { name: 'Galerie', href: '#gallery', icon: Gallery },
  ];

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
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-2 hover:bg-[#33C3F0] px-4 py-2 rounded-lg transition-colors duration-200 font-ubuntu"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
            <span className="text-black font-bold text-xl">SVB & MBU Roblox</span>
          </div>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-[#F97316] hover:text-white border-[#33C3F0]">
            <LogIn className="h-5 w-5" />
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
