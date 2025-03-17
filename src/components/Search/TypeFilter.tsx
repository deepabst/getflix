import { useState, useEffect } from 'react';
import './TypeFilter.css';

type MediaType = 'movie' | 'series' | 'episode' | 'game' | '';

interface TypeFilterProps {
  selectedType: MediaType;
  onTypeChange: (type: MediaType) => void;
  disabled: boolean;
}

const TypeFilter = ({ selectedType, onTypeChange, disabled }: TypeFilterProps) => {
  const handleTypeChange = (type: MediaType) => {
    if (!disabled) {
      onTypeChange(type);
    }
  };

  return (
    <div className="type-filter">
      <div className="filter-label">Filter by type:</div>
      <div className="filter-options">
        <button
          className={`filter-option ${selectedType === '' ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleTypeChange('')}
          disabled={disabled}
        >
          All
        </button>
        <button
          className={`filter-option ${selectedType === 'movie' ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleTypeChange('movie')}
          disabled={disabled}
        >
          Movies
        </button>
        <button
          className={`filter-option ${selectedType === 'series' ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleTypeChange('series')}
          disabled={disabled}
        >
          Series
        </button>
        <button
          className={`filter-option ${selectedType === 'episode' ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleTypeChange('episode')}
          disabled={disabled}
        >
          Episodes
        </button>
        <button
          className={`filter-option ${selectedType === 'game' ? 'active' : ''} ${disabled ? 'disabled' : ''}`}
          onClick={() => handleTypeChange('game')}
          disabled={disabled}
        >
          Games
        </button>
      </div>
    </div>
  );
};

export default TypeFilter;
