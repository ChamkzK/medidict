import React, { useEffect, useState } from 'react';
import { getWordOfDay } from '../lib/api';
import { MedicalTerm } from '@shared/schema';
import { TextToSpeech } from './ui/text-to-speech';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useSearch } from '../contexts/SearchContext';
import { searchMedicalTerms } from '../lib/api';
import { useToast } from '@/hooks/use-toast';
import { CalendarDays, Book, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function WordOfDay() {
  const [wordOfDay, setWordOfDay] = useState<MedicalTerm | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const searchContext = useSearch();
  const { toast } = useToast();

  useEffect(() => {
    const fetchWordOfDay = async () => {
      try {
        setIsLoading(true);
        const result = await getWordOfDay();
        
        if (result) {
          setWordOfDay(result);
          setError(null);
        } else {
          setError('Could not retrieve the word of the day');
        }
      } catch (e) {
        console.error('Error fetching word of the day:', e);
        setError('An error occurred while fetching the word of the day');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWordOfDay();
  }, []);

  const handleViewDetails = () => {
    if (!wordOfDay) return;
    
    // Set the search term
    searchContext.setSearchTerm(wordOfDay.term);
    searchContext.setIsLoading(true);
    searchContext.setHasSearched(true);
    searchContext.setShowSuggestions(false);
    
    // Add to recent searches
    searchContext.addToRecentSearches(wordOfDay.term);
    
    // Scroll to top for better user experience
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Perform the search to get the full details
    searchMedicalTerms(wordOfDay.term)
      .then(results => {
        searchContext.setSearchResults(results);
        if (results.length === 0) {
          toast({
            title: "No results found",
            description: `No results found for "${wordOfDay.term}"`,
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

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto mt-10 mb-6 animate-pulse">
        <Card>
          <CardHeader className="pb-2">
            <div className="h-5 bg-muted rounded w-28 mb-2"></div>
            <div className="h-7 bg-muted rounded w-3/4"></div>
          </CardHeader>
          <CardContent>
            <div className="h-4 bg-muted rounded w-full mb-2"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !wordOfDay) {
    return null; // Don't display anything if there's an error or no word
  }

  // Get the current date
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="max-w-md mx-auto mt-10 mb-10 animate-in fade-in duration-300">
      <Card className="overflow-hidden border border-border/40 shadow-lg">
        <CardHeader className="border-b border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent pb-3 dark:from-primary/20 dark:via-primary/10">
          <div className="flex items-center text-sm text-primary mb-2">
            <CalendarDays className="mr-2 h-4 w-4" />
            <span>Word of the Day — {formattedDate}</span>
          </div>
          <div className="flex justify-between items-start">
            <CardTitle className="text-2xl font-bold text-primary">
              {wordOfDay.term}
            </CardTitle>
            <TextToSpeech text={`${wordOfDay.term}. ${wordOfDay.definition}`} />
          </div>
          {wordOfDay.pronunciation && (
            <CardDescription className="italic text-muted-foreground">
              {wordOfDay.pronunciation}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-4">
          <p className="text-foreground line-clamp-3">
            {wordOfDay.definition}
          </p>
        </CardContent>
        <CardFooter className="flex justify-between border-t border-border bg-muted/30 py-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Book className="h-4 w-4 mr-1" />
            <span>{wordOfDay.type || 'Medical Term'}</span>
          </div>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleViewDetails}
            className="text-primary hover:text-primary/90 hover:bg-primary/10 flex items-center"
          >
            View Details
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}