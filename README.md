# Getflix Movie Search Application

A React application for searching movies using the OMDb API.

## Features

- Search for movies, series, episodes, and games
- Debounced search for improved performance and user experience
  - Prevents excessive API calls by waiting until the user stops typing
  - Reduces server load and improves application responsiveness
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

## Development Process & Collaboration with Cursor

The development of Getflix was a collaborative process between a human developer and Cursor, an AI-powered coding assistant. This section outlines the development journey and highlights key moments of collaboration.

### Initial Setup and Architecture

The project began with setting up a React 19 application with TypeScript and Vite. Cursor helped scaffold the initial project structure, including:

- Component hierarchy and organization
- TypeScript interfaces for API responses
- Context API setup for state management
- Routing configuration with React Router

### Iterative Development Process

Development proceeded through several iterative cycles, with each cycle focusing on specific features:

1. **Core Search Functionality**: Implementing the basic search interface and API integration
2. **UI Enhancements**: Improving the visual design and responsiveness
3. **Type Filtering**: Adding the ability to filter by content type
4. **Movie Details**: Creating a detailed view for individual movies
5. **Deployment Preparation**: Configuring the application for production deployment

### Key Collaboration Moments

Throughout the development process, there were several instances where the human-AI collaboration led to significant improvements:

#### Manual Testing Revealed Issues

1. **Type Filter Delay**: Manual testing revealed that the type filters were "one click behind" - selecting a filter wouldn't apply until a second filter was clicked. This led to a complete refactoring of the filter implementation to make it more responsive.

2. **UI Flickering During Filter Changes**: Testing showed flickering when switching between filters. This was addressed by implementing a more sophisticated state management approach that maintained UI stability during transitions.

3. **Movie Title Display Issues**: Testing identified that movie titles were being truncated too aggressively, making it difficult to read them. This led to UI improvements that prioritized title readability.

4. **Build Process Errors**: During deployment preparation, manual testing uncovered several TypeScript errors that weren't apparent during development. These were systematically addressed to ensure a successful production build.

#### Questioning AI-Generated Code

1. **GitHub Pages Configuration**: When preparing for deployment, the developer questioned whether the GitHub Pages-specific configuration was necessary for Vercel deployment. This led to simplifying the configuration for a more streamlined deployment process.

2. **Error Handling Approach**: The initial error handling implementation was questioned, leading to more user-friendly error messages and better handling of edge cases.

3. **Type Definition Structure**: The developer challenged some of the proposed TypeScript interfaces, resulting in more accurate type definitions that better matched the API responses.

### Lessons Learned

This collaborative development process highlighted several valuable insights:

1. **Importance of Manual Testing**: While AI can generate functional code, real-world testing remains essential for identifying UX issues and edge cases.

2. **Value of Critical Questioning**: Questioning AI suggestions led to better architectural decisions and more robust implementations.

3. **Iterative Refinement**: The development process benefited from multiple cycles of implementation, testing, and refinement.

4. **TypeScript's Role**: Strong typing helped catch potential issues early but required careful attention during the build process.

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

```
This project is licensed under the MIT License - see below for details:
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Future Improvements

While Getflix already provides a solid movie search experience, there are several potential enhancements that could be implemented in future iterations:

### Stretch Goals

1. **Watchlist Feature**:

   - Implement a watchlist where users can save movies they want to watch later
   - Use local storage for persistence across sessions
   - Add the ability to remove items from the watchlist

2. **Enhanced UI/UX**:

   - Add animations and transitions between pages and states
   - Implement skeleton loading states for a more polished loading experience
   - Add hover effects for movie cards to display additional information

3. **Theme Switching**:

   - Implement light and dark mode themes
   - Allow users to toggle between themes
   - Save theme preference in local storage

4. **Advanced Filtering**:

   - Add year range filters
   - Implement genre filtering (would require additional API calls)
   - Add sorting options (by year, title, rating)

5. **Performance Optimizations**:

   - Implement caching for search results to reduce API calls
   - Optimize image loading with lazy loading and proper sizing
   - Further refine the existing debounced search implementation

6. **Accessibility Improvements**:

   - Ensure full keyboard navigation
   - Implement proper ARIA attributes throughout the application
   - Add screen reader support for all interactive elements
   - Improve color contrast for better readability

7. **Testing**:

   - Add unit tests for components and hooks
   - Implement integration tests for key user flows
   - Add end-to-end testing with Cypress or Playwright

8. **Additional Features**:

   - Implement user ratings and reviews (would require backend)
   - Add similar movie recommendations
   - Integrate with additional APIs for more comprehensive movie data
   - Add trailer viewing capability

9. **Mobile Enhancements**:

   - Implement a mobile-first redesign for certain views
   - Add touch gestures for navigation
   - Optimize performance specifically for mobile devices

10. **Internationalization**:
    - Add support for multiple languages
    - Implement region-specific content filtering

These improvements would enhance the user experience and add valuable functionality to the application while maintaining its core simplicity and focus on movie discovery.
