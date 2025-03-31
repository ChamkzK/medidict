import React, { useEffect, useRef, useState } from 'react';
import { useSearch } from '../contexts/SearchContext';
import { getSuggestions, searchMedicalTerms } from '../lib/api';
import { useToast } from '@/hooks/use-toast';
import { Search } from 'lucide-react';

export function SearchBar() {
  const {
    searchTerm,
    setSearchTerm,
    suggestions,
    setSuggestions,
    setSearchResults,
    setIsLoading,
    showSuggestions,
    setShowSuggestions,
    setHasSearched,
    addToRecentSearches
  } = useSearch();
  
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [suggestionTimer, setSuggestionTimer] = useState<NodeJS.Timeout | null>(null);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  
  const fetchSuggestions = async (term: string) => {
    try {
      if (term.length >= 2) {
        const suggestions = await getSuggestions(term);
        setSuggestions(suggestions);
        setShowSuggestions(suggestions.length > 0);
        setHighlightedIndex(-1); // Reset highlighted index when new suggestions arrive
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear previous timer
    if (suggestionTimer) {
      clearTimeout(suggestionTimer);
    }
    
    // Set new timer for suggestions (debounce)
    const timer = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
    
    setSuggestionTimer(timer);
  };
  
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    // Add to recent searches
    addToRecentSearches(searchTerm);
    
    setIsLoading(true);
    setShowSuggestions(false);
    setHasSearched(true);
    
    try {
      const results = await searchMedicalTerms(searchTerm);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try different keywords or check the spelling",
          variant: "default"
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Search failed",
        description: "An error occurred while searching. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
    handleSearch();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
        // Select the highlighted suggestion
        handleSuggestionClick(suggestions[highlightedIndex]);
      } else {
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      // Navigate down through suggestions
      e.preventDefault();
      if (showSuggestions) {
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
      } else if (suggestions.length > 0) {
        setShowSuggestions(true);
        setHighlightedIndex(0);
      }
    } else if (e.key === 'ArrowUp') {
      // Navigate up through suggestions
      e.preventDefault();
      if (showSuggestions) {
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
      }
    } else if (e.key === 'Escape') {
      // Close suggestions
      setShowSuggestions(false);
    } else if (e.key === 'Tab' && showSuggestions && highlightedIndex >= 0) {
      // Select the highlighted suggestion on tab
      e.preventDefault();
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };
  
  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (suggestionTimer) {
        clearTimeout(suggestionTimer);
      }
    };
  }, [suggestionTimer]);
  
  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(e.target as Node) && 
        !(e.target as HTMLElement).closest('#searchSuggestions')
      ) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowSuggestions]);
  
  return (
    <section className="mb-10">
      <div className="relative max-w-2xl mx-auto">
        <div className="flex relative">
          <input 
            ref={inputRef}
            type="text" 
            id="searchInput" 
            placeholder="Search medical terms..." 
            className={`w-full px-4 py-3 border bg-background ${
              showSuggestions 
                ? 'border-primary border-b-0 rounded-t-lg rounded-b-none' 
                : 'border-input rounded-lg'
            } shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary font-sans text-lg text-foreground`}
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            autoComplete="off"
            aria-expanded={showSuggestions}
            aria-autocomplete="list"
            aria-controls="searchSuggestions"
            aria-activedescendant={highlightedIndex >= 0 ? `suggestion-${highlightedIndex}` : undefined}
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchTerm && (
              <button
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setSearchTerm('');
                  setSuggestions([]);
                  setShowSuggestions(false);
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
            <button 
              id="searchButton" 
              className="text-muted-foreground hover:text-primary transition-colors"
              onClick={handleSearch}
              aria-label="Search"
            >
              <Search className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Search Suggestions */}
        <div 
          id="searchSuggestions" 
          role="listbox"
          aria-label="Search suggestions"
          className={`${showSuggestions ? 'max-h-60' : 'max-h-0'} transition-all duration-200 bg-card shadow-lg rounded-b-lg mt-0 absolute left-0 right-0 z-10 border border-border ${showSuggestions ? 'border-t-0' : ''} overflow-y-auto overflow-x-hidden`}
        >
          {suggestions.length > 0 && (
            <div className="text-xs text-muted-foreground px-4 pt-2 pb-1">
              Suggestions (use ↑↓ arrows to navigate)
            </div>
          )}
          {suggestions.map((suggestion, index) => (
            <button 
              key={index}
              id={`suggestion-${index}`}
              role="option"
              aria-selected={highlightedIndex === index}
              className={`px-4 py-2 w-full text-left flex items-center space-x-2 ${
                highlightedIndex === index 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-card-foreground hover:bg-muted'
              }`}
              onClick={() => handleSuggestionClick(suggestion)}
              onMouseEnter={() => setHighlightedIndex(index)}
            >
              <Search className={`w-4 h-4 ${
                highlightedIndex === index ? 'text-primary' : 'text-muted-foreground'
              }`} />
              <span>
                {highlightedIndex === index ? (
                  <mark className="bg-transparent text-primary font-medium">{suggestion}</mark>
                ) : (
                  suggestion
                )}
              </span>
            </button>
          ))}
          {suggestions.length === 0 && showSuggestions && (
            <div className="px-4 py-3 text-muted-foreground text-sm">
              No suggestions found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
