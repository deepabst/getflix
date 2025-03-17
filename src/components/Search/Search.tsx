import { useState, useEffect } from 'react';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import { useSearchContext } from '../../context/SearchContext';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import './Search.css';

const Search = () => {
  const {
    searchTerm,
    setSearchTerm,
    searchResults,
    setSearchResults,
    totalResults,
    setTotalResults,
  } = useSearchContext();

  const { movies, totalResults: apiTotalResults, loading, error, search } = useMovieSearch();

  // Update context when search results change
  useEffect(() => {
    if (movies.length > 0) {
      setSearchResults(movies);
      setTotalResults(apiTotalResults);
    }
  }, [movies, apiTotalResults, setSearchResults, setTotalResults]);

  // Perform initial search if there's a saved search term
  useEffect(() => {
    if (searchTerm && searchResults.length === 0) {
      search(searchTerm);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (term: string) => {
    if (term.trim()) {
      search(term);
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

      {error && <p className="error-message">{error}</p>}

      {searchResults.length > 0 && (
        <>
          <p className="results-count">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          </p>
          <MovieList movies={searchResults} />
        </>
      )}

      {!error && searchResults.length === 0 && searchTerm && !loading && (
        <p className="no-results">No movies found. Try a different search term.</p>
      )}
    </div>
  );
};

export default Search;
