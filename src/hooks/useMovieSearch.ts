import { useState, useCallback } from 'react';
import { searchMovies } from '../services/movieService';
import { MovieSearchResult } from '../types/movie';

type MediaType = 'movie' | 'series' | 'episode' | 'game' | '';

interface UseMovieSearchResult {
  movies: MovieSearchResult[];
  totalResults: number;
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  mediaType: MediaType;
  setMediaType: (type: MediaType) => void;
  search: (term: string, page?: number, newType?: MediaType) => Promise<void>;
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
  const [mediaType, setMediaType] = useState<MediaType>('');

  // The search function now accepts an optional type parameter
  const search = useCallback(
    async (term: string, page = 1, newType?: MediaType) => {
      // Trim the search term
      const trimmedTerm = term.trim();

      // Don't search if the trimmed term is empty
      if (!trimmedTerm) {
        setMovies([]);
        setTotalResults(0);
        setError(null);
        setCurrentPage(1);
        setCurrentSearchTerm('');
        setHasMore(false);
        return;
      }

      // Set loading state to true
      setLoading(true);
      setError(null);

      // If we're on page 1, clear the movies array to show loading state
      if (page === 1) {
        setMovies([]);
      }

      // Use the provided type or fall back to the current mediaType
      const typeToUse = newType !== undefined ? newType : mediaType;

      try {
        // Call the API service with optional type filter
        const response = await searchMovies(trimmedTerm, page, typeToUse ? typeToUse : undefined);

        // Handle successful response
        if (response.Response === 'True') {
          // If it's a new search (page 1), replace the movies array
          // Otherwise, append to the existing array
          if (page === 1) {
            setMovies(response.Search);
          } else {
            // Filter out any duplicates that might occur
            const newMovies = response.Search.filter(
              (newMovie: MovieSearchResult) =>
                !movies.some(existingMovie => existingMovie.imdbID === newMovie.imdbID)
            );
            setMovies(prevMovies => [...prevMovies, ...newMovies]);
          }

          const total = parseInt(response.totalResults, 10);
          setTotalResults(total);

          // Check if there are more results to load
          setHasMore(page * 10 < total);

          // Update current search term and page
          setCurrentSearchTerm(trimmedTerm);
          setCurrentPage(page);

          // Clear any previous errors
          setError(null);
        } else {
          // Handle API error response
          if (page === 1) {
            setMovies([]);
            setTotalResults(0);
          }

          // Customize error message for "Movie not found" when filtering
          if (response.Error === 'Movie not found!' && typeToUse) {
            setError(
              `No ${typeToUse}s found for "${trimmedTerm}". Try a different search term or filter.`
            );
          } else {
            setError(response.Error || 'No results found');
          }

          setHasMore(false);
        }
      } catch (err) {
        // Handle unexpected errors
        if (page === 1) {
          setMovies([]);
          setTotalResults(0);
        }
        setError('An error occurred while searching. Please try again.');
        setHasMore(false);
      } finally {
        // Always set loading to false when done
        setLoading(false);
      }
    },
    [movies, mediaType]
  );

  // Simplified media type change handler
  const handleMediaTypeChange = useCallback(
    (type: MediaType) => {
      if (type !== mediaType) {
        setMediaType(type);

        // If there's an active search, re-search with the new type
        if (currentSearchTerm) {
          // Clear the current results immediately
          setMovies([]);
          // Pass the new type directly to the search function
          search(currentSearchTerm, 1, type);
        }
      }
    },
    [mediaType, currentSearchTerm, search]
  );

  const loadMore = useCallback(async () => {
    if (!loading && hasMore && currentSearchTerm) {
      const nextPage = currentPage + 1;
      await search(currentSearchTerm, nextPage);
    }
  }, [loading, hasMore, currentSearchTerm, currentPage, search]);

  return {
    movies,
    totalResults,
    loading,
    error,
    hasMore,
    mediaType,
    setMediaType: handleMediaTypeChange,
    search,
    loadMore,
  };
};
