import React from 'react';
import { useSearch } from '../contexts/SearchContext';

export function LoadingState() {
  const { isLoading } = useSearch();

  if (!isLoading) {
    return null;
  }

  return (
    <section className="text-center py-16">
      <div className="animate-pulse flex flex-col items-center">
        <div className="w-16 h-16 bg-neutral-200 rounded-full mb-4"></div>
        <div className="h-4 bg-neutral-200 rounded w-48 mb-2"></div>
        <div className="h-3 bg-neutral-200 rounded w-32"></div>
      </div>
    </section>
  );
}
