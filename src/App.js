// src/App.js
import React from 'react';
import './App.css';
import PostList from './components/post/PostList/PostList';
import PostComments from './components/post/PostItem/PostComments';
import Header from './components/layout/Header/Header';
import SubredditList from './components/layout/Subreddits/SubredditList';

const App = () => {
  

  return (
    <div className="App">
      <Header />
      <SubredditList />
      <PostList />
      <PostComments />
    </div>
  );
};

export default App;
