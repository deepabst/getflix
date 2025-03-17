import { ChangeEvent, useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (term: string) => void;
  loading: boolean;
}

const SearchBar = ({ searchTerm, setSearchTerm, onSubmit, loading }: SearchBarProps) => {
  const [localTerm, setLocalTerm] = useState(searchTerm);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTerm(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(localTerm);
  };

  // Update parent's searchTerm when localTerm changes
  useEffect(() => {
    setSearchTerm(localTerm);

    // Debounce search
    const timer = setTimeout(() => {
      if (localTerm.trim()) {
        onSubmit(localTerm);
      }
    }, 500);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTerm]);

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <input
        type="text"
        value={localTerm}
        onChange={handleChange}
        placeholder="Search for movies, series, episodes..."
        className="search-input"
        disabled={loading}
      />
      {loading && <div className="search-loader"></div>}
    </form>
  );
};

export default SearchBar;
