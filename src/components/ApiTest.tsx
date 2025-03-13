import React from 'react';
import { useState } from 'react';
import { useMovieSearch } from '../hooks/useMovieSearch';

const ApiTest = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { movies, loading, error, search } = useMovieSearch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    search(searchTerm);
  };

  return (
    <div className="api-test">
      <h3>API Test</h3>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder="Enter a movie title"
          className="search-input"
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {movies.length > 0 && (
        <div className="results">
          <h4>Results:</h4>
          <ul>
            {movies.map(movie => (
              <li key={movie.imdbID}>
                {movie.Title} ({movie.Year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ApiTest;
