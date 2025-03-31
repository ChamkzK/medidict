import { apiRequest } from './queryClient';
import { MedicalTerm, SearchResponse, SuggestionResponse } from '@shared/schema';

export const searchMedicalTerms = async (searchTerm: string): Promise<MedicalTerm[]> => {
  const response = await apiRequest('GET', `/api/search?term=${encodeURIComponent(searchTerm)}`, undefined);
  const data = await response.json() as SearchResponse;
  return data.results;
};

export const getSuggestions = async (partialTerm: string): Promise<string[]> => {
  if (!partialTerm || partialTerm.length < 2) {
    return [];
  }
  
  const response = await apiRequest('GET', `/api/suggestions?term=${encodeURIComponent(partialTerm)}`, undefined);
  const data = await response.json() as SuggestionResponse;
  return data.suggestions;
};

export const getMedicalTermByName = async (termName: string): Promise<MedicalTerm | null> => {
  try {
    const response = await apiRequest('GET', `/api/term?name=${encodeURIComponent(termName)}`, undefined);
    const data = await response.json() as MedicalTerm;
    return data;
  } catch (error) {
    return null;
  }
};

export const getWordOfDay = async (): Promise<MedicalTerm | null> => {
  try {
    const response = await apiRequest('GET', '/api/word-of-day', undefined);
    const data = await response.json() as MedicalTerm;
    return data;
  } catch (error) {
    console.error('Error fetching word of the day:', error);
    return null;
  }
};
