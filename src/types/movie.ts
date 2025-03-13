// Basic movie information from search results
export type MovieSearchResult = {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
};

// Search response from OMDb API
export type SearchResponse = {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
  Error?: string;
};

// Detailed movie information
export type MovieDetails = {
  imdbID: string;
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
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  Type: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
};
