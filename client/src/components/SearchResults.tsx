import React from 'react';
import { useSearch } from '../contexts/SearchContext';
import { TextToSpeech } from './ui/text-to-speech';
import { MedicalTerm } from '@shared/schema';
import { searchMedicalTerms } from '../lib/api';
import { useToast } from '@/hooks/use-toast';

export function SearchResults() {
  const searchContext = useSearch();
  const { searchResults } = searchContext;
  const { toast } = useToast();
  
  if (searchResults.length === 0) {
    return null;
  }
  
  return (
    <section className="results-appear max-w-3xl mx-auto animate-in fade-in duration-200">
      {searchResults.map((result: MedicalTerm) => (
        <div key={result.id} className="bg-card rounded-xl shadow-md p-6 mb-4 border border-border/40">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold font-sans text-primary">
                {result.term}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground mt-1">
                {result.type && (
                  <>
                    <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded">{result.type}</span>
                    <span className="text-muted-foreground/70">|</span>
                  </>
                )}
                {result.pronunciation && (
                  <span className="italic">{result.pronunciation}</span>
                )}
              </div>
            </div>
            
            {/* Audio button */}
            <TextToSpeech text={`${result.term}. ${result.definition}`} />
          </div>
        
          <div className="mb-4">
            <h4 className="font-semibold text-foreground/80 mb-2 font-sans">Definition</h4>
            <p className="text-foreground leading-relaxed">
              {result.definition}
            </p>
          </div>

          {/* Additional sections */}
          <div className="space-y-4 border-t border-border pt-4">
            {result.symptoms && result.symptoms.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground/80 mb-2 font-sans">Symptoms</h4>
                <ul className="list-disc pl-5 text-foreground/90 space-y-1">
                  {result.symptoms.map((symptom, index) => (
                    <li key={index}>{symptom}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {result.relatedTerms && result.relatedTerms.length > 0 && (
              <div>
                <h4 className="font-semibold text-foreground/80 mb-2 font-sans">Related Terms</h4>
                <div className="flex flex-wrap gap-2">
                  {result.relatedTerms.map((term, index) => (
                    <button 
                      key={index} 
                      className="text-sm bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-secondary-foreground transition-colors"
                      onClick={() => {
                        // Perform a search for the related term
                        searchContext.setSearchTerm(term);
                        searchContext.setIsLoading(true);
                        searchContext.setHasSearched(true);
                        searchContext.setShowSuggestions(false);
                        
                        // Scroll to top of the page
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                        
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
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
