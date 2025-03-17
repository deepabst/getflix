import { useState, useCallback } from 'react';
import { searchMovies } from '../services/movieService';
import { MovieSearchResult } from '../types/movie';

interface UseMovieSearchResult {
  movies: MovieSearchResult[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  search: (term: string, page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
}

export const useMovieSearch = (): UseMovieSearchResult => {
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearchTerm, setCurrentSearchTerm] = useState('');
  const [hasMore, setHasMore] = useState(false);

  const search = useCallback(
    async (term: string, page = 1) => {
      if (!term.trim()) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        setCurrentPage(1);
        setCurrentSearchTerm('');
        setHasMore(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await searchMovies(term, page);

        if (response.Response === 'True') {
          if (page === 1) {
            setMovies(response.Search);
          } else {
            const newMovies = response.Search.filter(
              newMovie => !movies.some(existingMovie => existingMovie.imdbID === newMovie.imdbID)
            );
            setMovies(prevMovies => [...prevMovies, ...newMovies]);
          }

          const total = parseInt(response.totalResults, 10);
          setTotalResults(total);

          setHasMore(movies.length + response.Search.length < total);

          setCurrentSearchTerm(term);
          setCurrentPage(page);
        } else {
          if (page === 1) {
            setMovies([]);
            setTotalResults(0);
          }
          setError(response.Error || 'No results found');
          setHasMore(false);
        }
      } catch (err) {
        if (page === 1) {
          setMovies([]);
          setTotalResults(0);
        }
        setError('An error occurred while searching. Please try again.');
        setHasMore(false);
      } finally {
        setLoading(false);
      }
    },
    [movies]
  );

  const loadMore = useCallback(async () => {
    if (!loading && hasMore && currentSearchTerm) {
      const nextPage = currentPage + 1;
      await search(currentSearchTerm, nextPage);
    }
  }, [loading, hasMore, currentSearchTerm, currentPage, search]);

  return { movies, totalResults, loading, error, hasMore, search, loadMore };
};
