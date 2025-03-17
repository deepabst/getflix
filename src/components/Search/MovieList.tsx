import { Link } from 'react-router-dom';
import { MovieSearchResult } from '../../types/movie';
import './MovieList.css';

interface MovieListProps {
  movies: MovieSearchResult[];
}

const MovieList = ({ movies }: MovieListProps) => {
  return (
    <div className="movie-list">
      {movies.map(movie => (
        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
          <div className="movie-poster">
            {movie.Poster !== 'N/A' ? (
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
            ) : (
              <div className="no-poster">No Poster Available</div>
            )}
          </div>
          <div className="movie-info">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
            <span className="movie-type">{movie.Type}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default MovieList;
