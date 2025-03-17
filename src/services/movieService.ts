import { SearchResponse, MovieDetailsResponse } from '../types/movie';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || '320f6ab2';
const API_URL = 'https://www.omdbapi.com/';

// Search movies by title
export const searchMovies = async (
  searchTerm: string,
  page: number = 1,
  type?: string
): Promise<SearchResponse> => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      s: searchTerm,
      page: page.toString(),
    });

    if (type) {
      params.append('type', type);
    }

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error searching movies:', error);
    return { Response: 'False', Error: 'Failed to fetch movies', Search: [], totalResults: '0' };
  }
};

// Get movie details by ID
export const getMovieDetails = async (imdbID: string): Promise<MovieDetailsResponse> => {
  try {
    const params = new URLSearchParams({
      apikey: API_KEY,
      i: imdbID,
      plot: 'full',
    });

    const response = await fetch(`${API_URL}?${params}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return { Response: 'False', Error: 'Failed to fetch movie details' };
  }
};
