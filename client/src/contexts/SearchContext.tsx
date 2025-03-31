import React, { createContext, useState, useContext } from 'react';
import { MedicalTerm } from '@shared/schema';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  suggestions: string[];
  setSuggestions: (suggestions: string[]) => void;
  searchResults: MedicalTerm[];
  setSearchResults: (results: MedicalTerm[]) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  hasSearched: boolean;
  setHasSearched: (hasSearched: boolean) => void;
  recentSearches: string[];
  addToRecentSearches: (term: string) => void;
  clearRecentSearches: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<MedicalTerm[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  
  // Initialize recent searches from localStorage if available
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });

  // Add a term to recent searches (keep only unique and limited to last 10)
  const addToRecentSearches = (term: string) => {
    if (!term.trim()) return;
    
    setRecentSearches(prev => {
      // Remove the term if it already exists (to move it to the top)
      const filtered = prev.filter(item => item.toLowerCase() !== term.toLowerCase());
      // Add to the beginning and limit to 10 items
      const updated = [term, ...filtered].slice(0, 10);
      // Save to localStorage
      localStorage.setItem('recentSearches', JSON.stringify(updated));
      return updated;
    });
  };
  
  // Clear all recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        suggestions,
        setSuggestions,
        searchResults,
        setSearchResults,
        isLoading,
        setIsLoading,
        showSuggestions,
        setShowSuggestions,
        hasSearched,
        setHasSearched,
        recentSearches,
        addToRecentSearches,
        clearRecentSearches
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = (): SearchContextType => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
