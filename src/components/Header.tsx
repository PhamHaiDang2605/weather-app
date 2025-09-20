import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Weather App</h1>
      <nav>
        <Link to="/search">Tìm kiếm</Link>
        <Link to="/">Dự báo 7 ngày</Link>
      </nav>
    </header>
  );
};

export default Header;