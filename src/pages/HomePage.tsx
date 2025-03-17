import Layout from '../components/layout/Layout';
import Search from '../components/Search/Search';

const HomePage = () => {
  return (
    <Layout>
      <div className="home-page">
        <h2>Find Your Favorite Movies</h2>
        <p>Search for movies to get started</p>

        <Search />
      </div>
    </Layout>
  );
};

export default HomePage;
