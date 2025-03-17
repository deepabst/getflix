import { useState } from 'react';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import './Search.css';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, totalResults, loading, error, search } = useMovieSearch();

  // Handle search submission
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

      {movies.length > 0 && (
        <>
          <p className="results-count">
            Found {totalResults} result{totalResults !== 1 ? 's' : ''}
          </p>
          <MovieList movies={movies} />
        </>
      )}

      {!error && movies.length === 0 && searchTerm && !loading && (
        <p className="no-results">No movies found. Try a different search term.</p>
      )}
    </div>
  );
};

export default Search;
