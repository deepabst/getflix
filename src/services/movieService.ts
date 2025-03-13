import axios from 'axios';
import { SearchResponse, MovieDetails } from '../types/movie';

const API_KEY = '320f6ab2';
const BASE_URL = 'https://www.omdbapi.com/';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    apikey: API_KEY,
  },
});

// Search movies by title
export const searchMovies = async (
  searchTerm: string,
  page: number = 1,
  type?: 'movie' | 'series' | 'episode'
): Promise<SearchResponse> => {
  try {
    const params: Record<string, string | number> = {
      s: searchTerm,
      page,
    };

    // Add type parameter if provided
    if (type) {
      params.type = type;
    }

    const response = await api.get('', { params });
    return response.data;
  } catch (error) {
    console.error('Error searching movies:', error);
    return {
      Search: [],
      totalResults: '0',
      Response: 'False',
      Error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
};

// Get movie details by ID
export const getMovieDetails = async (imdbID: string): Promise<MovieDetails | null> => {
  try {
    const response = await api.get('', {
      params: {
        i: imdbID,
        plot: 'full',
      },
    });

    if (response.data.Response === 'True') {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    return null;
  }
};
