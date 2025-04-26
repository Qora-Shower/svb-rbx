
import { useState } from 'react';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Play Game', href: '#play' },
    { name: 'Garage', href: '#garage' },
    { name: 'Shop', href: '#shop' },
    { name: 'Leaderboard', href: '#leaderboard' },
    { name: 'Settings', href: '#settings' },
  ];

  return (
    <nav className="fixed w-full bg-[#1EAEDB] shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white font-bold text-xl">SVB Bus</span>
          </div>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="p-2 text-white hover:bg-[#33C3F0]">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-[#1EAEDB] border-none">
              <div className="mt-6 flex flex-col gap-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-white hover:bg-[#33C3F0] px-4 py-2 rounded-lg transition-colors duration-200 font-ubuntu"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
