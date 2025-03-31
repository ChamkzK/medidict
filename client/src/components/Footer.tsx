import React from 'react';
import { Link } from 'wouter';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold mb-2 font-sans">MediDict</h2>
            <p className="text-primary-foreground/80 text-sm">
              Your accessible medical dictionary.
            </p>
          </div>
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 space-y-4 md:space-y-0">
            <Link href="/terms" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Terms of Use
            </Link>
            <Link href="/privacy" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-primary-foreground/20 text-sm text-center text-primary-foreground/70">
          <p>© {new Date().getFullYear()} MediDict. All rights reserved.</p>
          <p className="mt-1">This content is for informational purposes only and not intended as medical advice.</p>
        </div>
      </div>
    </footer>
  );
}
