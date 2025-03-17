import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMovieDetails } from '../../services/movieService';
import { MovieDetails as MovieDetailsType } from '../../types/movie';
import './MovieDetails.css';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const details = await getMovieDetails(id);
        if (details) {
          setMovie(details);
        } else {
          setError('Movie not found');
        }
      } catch (err) {
        setError('Failed to load movie details');
        console.error('Error fetching movie details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-loading">
        <div className="loader"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-error">
        <h2>Error</h2>
        <p>{error || 'Something went wrong'}</p>
        <Link to="/" className="back-button">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details">
      <div className="movie-details-header">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
        <h1 className="movie-title">{movie.Title}</h1>
        <div className="movie-meta">
          <span className="movie-year">{movie.Year}</span>
          <span className="movie-rated">{movie.Rated}</span>
          <span className="movie-runtime">{movie.Runtime}</span>
        </div>
      </div>

      <div className="movie-details-content">
        <div className="movie-poster-container">
          {movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
          ) : (
            <div className="no-poster">No Poster Available</div>
          )}

          <div className="movie-ratings">
            {movie.Ratings.map((rating, index) => (
              <div key={index} className="rating">
                <span className="rating-source">{rating.Source}</span>
                <span className="rating-value">{rating.Value}</span>
              </div>
            ))}
            {movie.imdbRating !== 'N/A' && (
              <div className="imdb-rating">
                <span className="rating-label">IMDb Rating:</span>
                <span className="rating-value">{movie.imdbRating}/10</span>
                <span className="rating-votes">({movie.imdbVotes} votes)</span>
              </div>
            )}
          </div>
        </div>

        <div className="movie-info">
          <p className="movie-plot">{movie.Plot}</p>

          <div className="info-grid">
            {movie.Genre !== 'N/A' && (
              <div className="info-item">
                <h3>Genre</h3>
                <p>{movie.Genre}</p>
              </div>
            )}

            {movie.Director !== 'N/A' && (
              <div className="info-item">
                <h3>Director</h3>
                <p>{movie.Director}</p>
              </div>
            )}

            {movie.Writer !== 'N/A' && (
              <div className="info-item">
                <h3>Writer</h3>
                <p>{movie.Writer}</p>
              </div>
            )}

            {movie.Actors !== 'N/A' && (
              <div className="info-item">
                <h3>Actors</h3>
                <p>{movie.Actors}</p>
              </div>
            )}

            {movie.Awards !== 'N/A' && (
              <div className="info-item">
                <h3>Awards</h3>
                <p>{movie.Awards}</p>
              </div>
            )}

            {movie.BoxOffice !== 'N/A' && movie.BoxOffice && (
              <div className="info-item">
                <h3>Box Office</h3>
                <p>{movie.BoxOffice}</p>
              </div>
            )}

            {movie.Production !== 'N/A' && movie.Production && (
              <div className="info-item">
                <h3>Production</h3>
                <p>{movie.Production}</p>
              </div>
            )}

            {movie.Released !== 'N/A' && (
              <div className="info-item">
                <h3>Released</h3>
                <p>{movie.Released}</p>
              </div>
            )}

            {movie.Country !== 'N/A' && (
              <div className="info-item">
                <h3>Country</h3>
                <p>{movie.Country}</p>
              </div>
            )}

            {movie.Language !== 'N/A' && (
              <div className="info-item">
                <h3>Language</h3>
                <p>{movie.Language}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
