import { useParams, Link } from 'react-router-dom';
import React from 'react';
import Layout from '../components/layout/Layout';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <Layout>
      <div className="movie-details-page">
        <Link to="/" className="back-button">
          ← Back to Search
        </Link>
        <h2>Movie Details</h2>
        <p>Movie ID: {id}</p>
        {/* Movie details will be implemented later */}
      </div>
    </Layout>
  );
};

export default MovieDetailsPage;
