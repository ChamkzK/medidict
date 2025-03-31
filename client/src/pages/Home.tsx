import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SearchBar } from '@/components/SearchBar';
import { SearchResults } from '@/components/SearchResults';
import { EmptyState } from '@/components/EmptyState';
import { LoadingState } from '@/components/LoadingState';
import { HelpSection } from '@/components/HelpSection';
import { RecentSearches } from '@/components/RecentSearches';
import { WordOfDay } from '@/components/WordOfDay';
import { useSearch } from '@/contexts/SearchContext';

export default function Home() {
  const { hasSearched } = useSearch();

  return (
    <div className="flex flex-col min-h-screen bg-background transition-colors">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
        {/* Hero Section */}
        <section className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold font-sans mb-3 text-foreground bg-clip-text">
            Medical Dictionary
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Search for medical terms, read definitions, and listen to pronunciations.
            No login required.
          </p>
        </section>
        
        {/* Search Bar */}
        <SearchBar />
        
        {/* Recent Searches */}
        <RecentSearches />
        
        {/* Loading State */}
        <LoadingState />
        
        {/* Search Results */}
        <SearchResults />
        
        {/* Empty State */}
        <EmptyState />
        
        {/* Word of the Day - Show only when no search has been performed */}
        {!hasSearched && <WordOfDay />}
        
        {/* Help Section */}
        <HelpSection />
      </main>
      
      <Footer />
    </div>
  );
}
