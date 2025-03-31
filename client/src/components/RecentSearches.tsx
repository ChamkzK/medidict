import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import { Button } from '@/components/ui/button';
import { X, Clock, ArrowRight } from 'lucide-react';
import { searchMedicalTerms } from '../lib/api';
import { useToast } from '@/hooks/use-toast';

export function RecentSearches() {
  const searchContext = useSearch();
  const { recentSearches, clearRecentSearches, addToRecentSearches } = searchContext;
  const { toast } = useToast();

  // If no recent searches, don't render the component
  if (recentSearches.length === 0) {
    return null;
  }

  const handleSearchClick = (term: string) => {
    // Set the search term
    searchContext.setSearchTerm(term);
    searchContext.setIsLoading(true);
    searchContext.setHasSearched(true);
    searchContext.setShowSuggestions(false);
    
    // Add to recent searches (this will move it to the top)
    addToRecentSearches(term);
    
    // Execute the search
    searchMedicalTerms(term)
      .then(results => {
        searchContext.setSearchResults(results);
        if (results.length === 0) {
          toast({
            title: "No results found",
            description: `No results found for "${term}"`,
            variant: "default"
          });
        }
      })
      .catch(error => {
        console.error('Search error:', error);
        toast({
          title: "Search failed",
          description: "An error occurred while searching. Please try again.",
          variant: "destructive"
        });
      })
      .finally(() => {
        searchContext.setIsLoading(false);
      });
  };

  return (
    <div className="max-w-3xl mx-auto mt-4 mb-6 animate-in fade-in duration-200">
      <div className="bg-white shadow-sm rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-neutral-700 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-neutral-500" />
            Recent Searches
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={clearRecentSearches}
            className="text-neutral-500 hover:text-neutral-800"
          >
            Clear history
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {recentSearches.map((term, index) => (
            <div 
              key={index}
              className="group flex items-center bg-neutral-50 hover:bg-neutral-100 transition-colors rounded-lg px-3 py-1.5"
            >
              <button
                onClick={() => handleSearchClick(term)}
                className="text-primary-dark flex items-center"
              >
                {term}
                <ArrowRight className="w-3.5 h-3.5 ml-1.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button 
                onClick={() => {
                  // Remove this specific term
                  const updatedSearches = recentSearches.filter((_, i) => i !== index);
                  localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
                  // Use the context's function to update state
                  searchContext.clearRecentSearches();
                  if (updatedSearches.length > 0) {
                    updatedSearches.forEach(t => searchContext.addToRecentSearches(t));
                  }
                }}
                className="ml-2 text-neutral-400 hover:text-neutral-700 rounded-full p-0.5"
                aria-label={`Remove ${term} from recent searches`}
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}