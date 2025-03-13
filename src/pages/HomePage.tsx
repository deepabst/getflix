import Layout from '../components/layout/Layout';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <Layout>
      <div className="home-page">
        <h2>Find Your Favorite Movies</h2>
        <p>Search for movies to get started</p>
        {/* Test link to verify SPA navigation */}
        <p>
          <Link to="/movie/tt1375666" className="test-link">
            Test: View Inception Details
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default HomePage;
