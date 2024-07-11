//src/components/layout/Header/Header.js
import './Header.css'
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { fetchSearchResults } from '../../../redux/postsSlice';
import logo from '../../../assets/logo_64px.jpeg'; // Import the logo image
import searchIcon from '../../../assets/search.png';
import SubredditList from '../Subreddits/SubredditList';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();
  const searchBoxRef = useRef(null);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== '') {
      dispatch(fetchSearchResults(searchQuery));
    }
    window.scrollTo(0, 0);
  };

  const handleSearchButtonClick = () => {
    setIsSearchActive(true);
    if (searchBoxRef.current) {
        searchBoxRef.current.focus(); // Focus on the search input when search button is clicked
    }
  };

  const handleLogoClick = () => {
    window.location.reload(); // Reload the page when logo is clicked
  };

  // Add event listener to handle click outside search box
  useEffect(() => {
    const handleClickOutside = (e) => {
        if (searchBoxRef.current && !searchBoxRef.current.contains(e.target)) {
            setIsSearchActive(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchBoxRef]);

  return (
    <>
    <header>
      <div className='logo' onClick={handleLogoClick}><img alt='logo' src={logo} /><h1>Redditsign</h1></div>
      <form onSubmit={handleSearchSubmit} name='search' className='search_form search-bar'>
        <button type="button" className='search_button btn-search' onClick={handleSearchButtonClick}><img alt='search' src={searchIcon} className='search_icon' /></button>
        <input 
          type="text" 
          id='search'
          className={`search_box ${isSearchActive ? 'active' : ''}`}
          placeholder="Search posts..." 
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} 
          ref={searchBoxRef}
        />
      </form>
      <SubredditList />
    </header>
</>
  );
};

export default React.memo(Header);
