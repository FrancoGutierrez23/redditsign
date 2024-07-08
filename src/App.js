// src/App.js
import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from './components/layout/Header/Header';
import Footer from './components/layout/Footer/Footer'
const PostList = lazy(() => import('./components/post/PostList/PostList'));
const PostComments = lazy(() => import('./components/post/PostComments/PostComments'));

const App = () => {
  const isModalOpen = useSelector((state) => state.postItem.isModalOpen);
  const posts = useSelector((state) => state.posts.posts);
  const loading = useSelector((state) => state.posts.loading);
  const error = useSelector((state) => state.posts.error);
  const after = useSelector((state) => state.posts.after);
  const selectedSubreddit = useSelector((state) => state.posts.selectedSubreddit);
  document.cookie = "key=value; SameSite=None; Secure";

  return (
    <div className="App">
      <Header />
      <Suspense>
        {loading && <div className='wrapper'><span className="loader">Loading</span></div>}
        {error && <span className='posts_error'>Error: {error}</span>}
        <PostList posts={posts} after={after} selectedSubreddit={selectedSubreddit} />
        {isModalOpen && <PostComments />}
        <Footer />
      </Suspense>
    </div>
    
  );
};

export default React.memo(App);

