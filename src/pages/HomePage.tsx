import Layout from '../components/layout/Layout';
import Search from '../components/Search/Search';
import './HomePage.css';

const HomePage = () => {
  return (
    <Layout>
      <div className="home-page">
        <div className="hero">
          <h2 className="hero-title">Find Your Favorite Movies</h2>
          <p className="hero-subtitle">Search for movies to get started</p>
        </div>
        <Search />
      </div>
    </Layout>
  );
};

export default HomePage;
