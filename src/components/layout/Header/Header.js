// src/components/layout/Header/Header.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../../redux/postsSlice';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      dispatch(fetchSearchResults(searchQuery));
    }
  };

  return (
    <header>
      <h1>Reddit Viewer</h1>
      <form onSubmit={handleSearchSubmit}>
        <input 
          type="text" 
          placeholder="Search posts..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button type="submit">Search</button>
      </form>
    </header>
  );
};

export default Header;
