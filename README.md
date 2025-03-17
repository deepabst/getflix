# Getflix Movie Search Application

A React application for searching movies using the OMDb API.

## Features

- Search for movies, series, episodes, and games
- View detailed information about each title
- Filter results by type (movie, series, episode, game)
- Responsive design for all screen sizes
- Infinite scrolling for search results

## Technologies Used

- React 19
- TypeScript
- React Router
- OMDb API
- CSS for styling

## Deployment

### Deploying to Vercel

1. Create an account on [Vercel](https://vercel.com) if you don't have one
2. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```
3. Login to Vercel:
   ```
   vercel login
   ```
4. Deploy the application:
   ```
   vercel
   ```
5. For production deployment:
   ```
   vercel --prod
   ```

### Deploying to Netlify

1. Create an account on [Netlify](https://netlify.com) if you don't have one
2. Install the Netlify CLI:
   ```
   npm install -g netlify-cli
   ```
3. Login to Netlify:
   ```
   netlify login
   ```
4. Deploy the application:
   ```
   netlify deploy
   ```
5. For production deployment:
   ```
   netlify deploy --prod
   ```

### Deploying to GitHub Pages

1. Add the `gh-pages` package:
   ```
   npm install --save-dev gh-pages
   ```
2. Add the following to your `package.json`:
   ```json
   {
     "homepage": "https://yourusername.github.io/getflix",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```
3. Deploy the application:
   ```
   npm run deploy
   ```

## Development

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Build for production:
   ```
   npm run build
   ```

## API Key

This application uses the OMDb API. The API key is included in the repository for demonstration purposes. For a production application, you should use environment variables to store the API key.

## Project Structure

## API Usage

This project uses the OMDb API with the following endpoints:

- Search: `https://www.omdbapi.com/?s=SEARCH_TERM&apikey=API_KEY`
- Movie details: `https://www.omdbapi.com/?i=MOVIE_ID&apikey=API_KEY`

## License

[MIT](LICENSE)
