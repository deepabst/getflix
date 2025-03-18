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

  // This useEffect implements debounced search
  // It waits 500ms after the user stops typing before triggering a search
  useEffect(() => {
    // Skip if input is empty or matches current search term
    if (!inputValue.trim() || inputValue === searchTerm) return;

    // Create a timer that will execute after 500ms
    const debounceTimer = setTimeout(() => {
      // Only trigger search if input value is different from current search term
      if (inputValue !== searchTerm) {
        onSubmit(inputValue);
      }
    }, 500); // 500ms debounce delay

    // Cleanup function that clears the timer if component re-renders before timer completes
    // This effectively cancels the search if user types again within 500ms
    return () => clearTimeout(debounceTimer);
  }, [inputValue, searchTerm, onSubmit]);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Update local state immediately for responsive UI
    setInputValue(e.target.value);
    // The actual search will be triggered by the useEffect after the debounce delay
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Immediate search on form submission (bypasses debounce)
    onSubmit(inputValue);
  };

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
