import './Header.css'
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
      <h1>Redditsign</h1>
      <form onSubmit={handleSearchSubmit} name='search' className='search_form'>
        <input 
          type="text" 
          className='search_box'
          placeholder="Search posts..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button type="submit" className='search_button'>Search</button>
      </form>
    </header>
  );
};

export default Header;
