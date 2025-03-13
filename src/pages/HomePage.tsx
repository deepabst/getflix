import Layout from '../components/layout/Layout';
import React from 'react';
import { Link } from 'react-router-dom';
import ApiTest from '../components/ApiTest';

const HomePage = () => {
  return (
    <Layout>
      <div className="home-page">
        <h2>Find Your Favorite Movies</h2>
        <p>Search for movies to get started</p>

        {/* API Test Component */}
        <ApiTest />

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
