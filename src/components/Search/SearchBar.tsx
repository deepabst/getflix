import { ChangeEvent, useState, useEffect } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSubmit: (term: string) => void;
  loading: boolean;
}

const SearchBar = ({ searchTerm, setSearchTerm, onSubmit, loading }: SearchBarProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  // Update local term when searchTerm changes (e.g., when returning from details page)
  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(inputValue);
  };

  // Debounce search
  useEffect(() => {
    if (inputValue !== searchTerm) {
      const timer = setTimeout(() => {
        if (inputValue.trim()) {
          setSearchTerm(inputValue);
          onSubmit(inputValue);
        }
      }, 500);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        className="search-input"
        placeholder="Search for movies to get started"
        value={inputValue}
        onChange={handleChange}
        disabled={loading}
      />
      {loading && <div className="search-loader"></div>}
    </form>
  );
};

export default SearchBar;
