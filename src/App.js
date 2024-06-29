// src/App.js
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer'
const PostList = lazy(() => import('./components/post/PostList/PostList'));
const PostComments = lazy(() => import('./components/post/PostComments/PostComments'));
const SubredditList = lazy(() => import('./components/layout/Subreddits/SubredditList'));

const App = () => {
  const isModalOpen = useSelector((state) => state.postItem.isModalOpen);
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const after = useSelector((state) => state.posts.after);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);

  return (
    <div className="App">
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <SubredditList />
        {loading && <p className='problem'>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <PostList posts={posts} after={after} selectedSubreddit={selectedSubreddit} />
        {isModalOpen && <PostComments />}
      </Suspense>
      <Footer />
    </div>
    
  );
};

export default React.memo(App);

