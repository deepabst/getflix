import { useState, useCallback } from 'react';
import { searchMovies } from '../services/movieService';
import { MovieSearchResult } from '../types/movie';

interface UseMovieSearchResult {
  movies: MovieSearchResult[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  search: (term: string, page?: number) => Promise<void>;
}

export const useMovieSearch = (): UseMovieSearchResult => {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = useCallback(async (term: string, page = 1) => {
    if (!term.trim()) {
      setMovies([]);
      setTotalResults(0);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await searchMovies(term, page);

      if (response.Response === 'True') {
        setMovies(response.Search);
        setTotalResults(parseInt(response.totalResults, 10));
      } else {
        setMovies([]);
        setTotalResults(0);
        setError(response.Error || 'No results found');
      }
    } catch (err) {
      setMovies([]);
      setTotalResults(0);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, totalResults, loading, error, search };
};
