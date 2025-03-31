import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Check for mobile screen size on client side only
  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Only show the mobile menu toggle after mounting (client-side)
  const showMobileContent = mounted ? isMobile : false;
  const showDesktopContent = mounted ? !isMobile : true;

  return (
    <header className="border-b border-neutral-200 bg-white dark:bg-neutral-900 dark:border-neutral-800 shadow-sm transition-colors">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-primary">
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold font-sans text-primary dark:text-primary">MediDict</h1>
        </Link>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
          
          {showMobileContent && (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent aria-describedby="menu-description">
                <SheetHeader>
                  <SheetTitle className="text-primary">Menu</SheetTitle>
                </SheetHeader>
                <p id="menu-description" className="sr-only">Navigation menu for the MediDict application</p>
                <nav className="mt-6">
                  <ul className="space-y-4">
                    <li>
                      <Link href="/" className="block py-2 text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="block py-2 text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact" className="block py-2 text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </nav>
              </SheetContent>
            </Sheet>
          )}
          
          {showDesktopContent && (
            <nav>
              <ul className="flex space-x-6 text-sm md:text-base">
                <li>
                  <Link 
                    href="/" 
                    className="text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/contact" 
                    className="text-neutral-700 dark:text-neutral-200 hover:text-primary dark:hover:text-primary transition-colors font-medium"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
