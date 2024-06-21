// src/App.js
import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import PostList from './components/post/PostList/PostList';
import PostComments from './components/post/PostItem/PostComments';
import Header from './components/layout/Header/Header';
import SubredditList from './components/layout/Subreddits/SubredditList';

const App = () => {
  const isModalOpen = useSelector((state) => state.postItem.isModalOpen);

  return (
    <div className="App">
      <Header />
      <SubredditList />
      <PostList />
      {isModalOpen && <PostComments />} {/* Conditionally render modal */}
    </div>
  );
};

export default App;
