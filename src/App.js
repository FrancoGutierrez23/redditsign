// src/App.js

import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/layout/Header/Header';

const PostList = lazy(() => import('./components/post/PostList/PostList'));
const PostComments = lazy(() => import('./components/post/PostComments/PostComments'));
const SubredditList = lazy(() => import('./components/layout/Subreddits/SubredditList'));

const App = () => {
  const isModalOpen = useSelector((state) => state.postItem.isModalOpen);

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <PostList />
        {isModalOpen && <PostComments />}
        <SubredditList />
      </Suspense>
    </div>
  );
};

export default App;
