import { useEffect, useRef, useCallback, useState } from 'react';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useSearchContext } from '../../context/SearchContext';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import MovieList from './MovieList';
import './Search.css';

type MediaType = 'movie' | 'series' | 'episode' | 'game' | '';

const Search = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    totalResults,
    setTotalResults,
    mediaType: contextMediaType,
    setMediaType: setContextMediaType,
  } = useSearchContext();

  const {
    movies,
    totalResults: apiTotalResults,
    loading,
    error,
    hasMore,
    mediaType,
    setMediaType,
    search,
    loadMore,
  } = useMovieSearch();

  // Local state to prevent UI flicker during type changes
  const [displayedMovies, setDisplayedMovies] = useState<typeof movies>([]);
  const [isChangingType, setIsChangingType] = useState(false);

  // Reference to the loading element for intersection observer
  const observer = useRef<IntersectionObserver | null>(null);
  const loadingRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;

      // Disconnect previous observer
      if (observer.current) observer.current.disconnect();

      // Create new observer
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      // Observe the loading element
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMore]
  );

  // Update displayed movies when movies change, but only if not changing type
  useEffect(() => {
    if (movies.length > 0) {
      setDisplayedMovies(movies);
      setIsChangingType(false);
    } else if (!isChangingType) {
      setDisplayedMovies([]);
    }
  }, [movies, isChangingType]);

  // Update context when search results change
  useEffect(() => {
    setSearchResults(movies);
    setTotalResults(apiTotalResults);
  }, [movies, apiTotalResults, setSearchResults, setTotalResults]);

  // Sync media type with context (one-time on mount)
  useEffect(() => {
    if (contextMediaType !== '' && contextMediaType !== mediaType) {
      setMediaType(contextMediaType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update context when media type changes
  useEffect(() => {
    if (mediaType !== contextMediaType) {
      setContextMediaType(mediaType);
    }
  }, [mediaType, contextMediaType, setContextMediaType]);

  // Perform initial search if there's a saved search term (one-time on mount)
  useEffect(() => {
    if (searchTerm) {
      search(searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (term: string) => {
    if (term.trim()) {
      setSearchTerm(term);
      search(term);
    }
  };

  const handleTypeChange = (type: MediaType) => {
    if (type !== mediaType) {
      setIsChangingType(true);
      setMediaType(type);
    }
  };

  return (
    <div className="search-container">
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSubmit={handleSubmit}
        loading={loading}
      />

      <TypeFilter
        selectedType={mediaType}
        onTypeChange={handleTypeChange}
        disabled={loading || !searchTerm}
      />

      {error && <p className="error-message">{error}</p>}

      {displayedMovies.length > 0 && !error && (
        <>
          <p className="results-count">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
            {mediaType && ` in the ${mediaType} category`}
          </p>
          <MovieList movies={displayedMovies} />

          {/* Loading indicator for infinite scroll */}
          {hasMore && (
            <div ref={loadingRef} className="loading-more">
              {loading && <div className="loader"></div>}
            </div>
          )}
        </>
      )}

      {!error && displayedMovies.length === 0 && searchTerm && !loading && !isChangingType && (
        <p className="no-results">No results found. Try a different search term or filter.</p>
      )}

      {(loading || isChangingType) && displayedMovies.length === 0 && (
        <div className="loading-container">
          <div className="loader"></div>
          <p>Searching...</p>
        </div>
      )}
    </div>
  );
};

export default Search;
