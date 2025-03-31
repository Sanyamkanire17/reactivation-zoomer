
import React from 'react';
import { Button } from './ui/button';
import { Instagram, Facebook, Twitter, Youtube, Linkedin } from 'lucide-react';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-2">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side navigation */}
        <div className="flex space-x-2">
          <Button variant="ghost" className="text-white hover:bg-white/10">
            Contact Us
          </Button>
          <Button variant="ghost" className="text-white hover:bg-white/10">
            About Us
          </Button>
        </div>
        
        {/* Logo would go here if needed */}
        <div className="hidden md:block">
          {/* Placeholder for logo */}
        </div>
        
        {/* Right side social icons */}
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Instagram size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Facebook size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Youtube size={20} />
          </a>
          <a href="#" className="text-white hover:text-gray-300 transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
