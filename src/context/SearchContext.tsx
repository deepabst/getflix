import { createContext, useState, useContext, ReactNode } from 'react';
import { MovieSearchResult } from '../types/movie';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  searchResults: MovieSearchResult[];
  setSearchResults: (results: MovieSearchResult[]) => void;
  totalResults: number;
  setTotalResults: (total: number) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        searchResults,
        setSearchResults,
        totalResults,
        setTotalResults,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
