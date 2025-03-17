// Basic movie search result type
export interface MovieSearchResult {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

// Response from search API
export interface SearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
  Error?: string;
}

// Alias for backward compatibility
export type MovieSearchResponse = SearchResponse;

// Detailed movie information
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

// Response from details API
export interface MovieDetailsResponse {
  Response: string;
  Error?: string;
  [key: string]: any; // Allow for all the movie details properties
}
