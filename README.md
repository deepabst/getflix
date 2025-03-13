# Getflix Movie Search Application

A single-page application for searching movies and viewing detailed information using the OMDb API.

## Features

- Search for movies by title
- View search results with movie posters, titles, and release years
- See detailed information about selected movies
- Responsive design for all device sizes

## Tech Stack

- React 19
- TypeScript
- React Router for navigation
- OMDb API for movie data

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm

### Installation

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd getflix
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

## API Usage

This project uses the OMDb API with the following endpoints:

- Search: `https://www.omdbapi.com/?s=SEARCH_TERM&apikey=API_KEY`
- Movie details: `https://www.omdbapi.com/?i=MOVIE_ID&apikey=API_KEY`

## License

[MIT](LICENSE)
