import React, { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import PostList from './components/post/PostList/PostList';
import Header from './components/layout/Header/Header';
// Lazy load components
const PostComments = lazy(() => import('./components/post/PostComments/PostComments'));
const SubredditList = lazy(() => import('./components/layout/Subreddits/SubredditList'));

const App = () => {
  const isModalOpen = useSelector((state) => state.postItem.isModalOpen);

  return (
    <div className="App">
      <Header />
      <PostList />
      {isModalOpen && (
        <Suspense fallback={<div>Loading comments...</div>}>
          <PostComments />
        </Suspense>
      )}
      <Suspense fallback={<div>Loading subreddits...</div>}>
        <SubredditList />
      </Suspense>
    </div>
  );
};

export default App;
