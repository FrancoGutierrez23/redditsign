//src/components/layout/Header/Header.js
import './Header.css'
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../../redux/postsSlice';
import logo from '../../../assets/logo_64px.jpeg'; // Import the logo image

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      dispatch(fetchSearchResults(searchQuery));
    }
  };

  const handleSearchButtonClick = () => {
    setIsSearchActive(true);
  };

  return (
    <header>
      <div className='logo'><img alt='logo' src={logo} style={{width: '64px', height: 'auto'}} /><h1>Redditsign</h1></div> {/* Use the imported logo */}
      <form onSubmit={handleSearchSubmit} name='search' className='search_form search-bar'>
        <input 
          type="text" 
          className={`search_box ${isSearchActive ? 'active' : ''}`}
          placeholder="Search posts..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
        <button type="button" className='search_button btn-search' onClick={handleSearchButtonClick}>Search</button>
      </form>
    </header>
  );
};

export default React.memo(Header);
