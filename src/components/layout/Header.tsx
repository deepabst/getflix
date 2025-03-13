import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>GETFLIX</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
