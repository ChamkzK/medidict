import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useSearch } from '../contexts/SearchContext';

export function EmptyState() {
  const { searchResults, hasSearched, isLoading } = useSearch();

  // Only show empty state when we've searched, not loading, and have no results
  if (!hasSearched || isLoading || searchResults.length > 0) {
    return null;
  }

  return (
    <section className="text-center py-16">
      <AlertCircle className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
      <h3 className="text-xl font-semibold text-neutral-600 mb-2">No Results Found</h3>
      <p className="text-neutral-500 max-w-md mx-auto">
        We couldn't find any medical terms matching your search. Try searching with different keywords or check the spelling.
      </p>
    </section>
  );
}
