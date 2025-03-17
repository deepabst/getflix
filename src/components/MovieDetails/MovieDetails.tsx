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

        if (details.Response === 'True') {
          // Cast the response to MovieDetailsType
          setMovie(details as unknown as MovieDetailsType);
        } else {
          setError(details.Error || 'Failed to load movie details');
          setMovie(null);
        }
      } catch (err) {
        setError('An error occurred while fetching movie details');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-container loading">
        <div className="loader"></div>
        <p>Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="movie-details-container error">
        <h2>Error</h2>
        <p>{error || 'Movie not found'}</p>
        <Link to="/" className="back-button">
          Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="movie-details-container">
      <div className="movie-details-header">
        <Link to="/" className="back-button">
          Back to Search
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
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img src={movie.Poster} alt={`${movie.Title} poster`} className="movie-poster" />
          ) : (
            <div className="no-poster">No Poster Available</div>
          )}

          <div className="movie-ratings">
            {movie.Ratings &&
              movie.Ratings.map((rating, index) => (
                <div key={index} className="rating">
                  <span className="rating-source">{rating.Source}</span>
                  <span className="rating-value">{rating.Value}</span>
                </div>
              ))}
          </div>
        </div>

        <div className="movie-info">
          <p className="movie-plot">{movie.Plot}</p>

          <div className="movie-details-grid">
            {movie.Genre && (
              <div className="detail-item">
                <h3>Genre</h3>
                <p>{movie.Genre}</p>
              </div>
            )}

            {movie.Director && movie.Director !== 'N/A' && (
              <div className="detail-item">
                <h3>Director</h3>
                <p>{movie.Director}</p>
              </div>
            )}

            {movie.Writer && movie.Writer !== 'N/A' && (
              <div className="detail-item">
                <h3>Writer</h3>
                <p>{movie.Writer}</p>
              </div>
            )}

            {movie.Actors && (
              <div className="detail-item">
                <h3>Actors</h3>
                <p>{movie.Actors}</p>
              </div>
            )}

            {movie.Language && (
              <div className="detail-item">
                <h3>Language</h3>
                <p>{movie.Language}</p>
              </div>
            )}

            {movie.Country && (
              <div className="detail-item">
                <h3>Country</h3>
                <p>{movie.Country}</p>
              </div>
            )}

            {movie.Awards && movie.Awards !== 'N/A' && (
              <div className="detail-item">
                <h3>Awards</h3>
                <p>{movie.Awards}</p>
              </div>
            )}

            {movie.BoxOffice && movie.BoxOffice !== 'N/A' && (
              <div className="detail-item">
                <h3>Box Office</h3>
                <p>{movie.BoxOffice}</p>
              </div>
            )}

            {movie.Production && movie.Production !== 'N/A' && (
              <div className="detail-item">
                <h3>Production</h3>
                <p>{movie.Production}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
