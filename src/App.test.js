import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import App from './App';
const thunk = require('redux-thunk').thunk;

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('App Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      posts: {
        posts: [],
        loading: false,
        error: null,
        after: null,
        selectedSubreddit: null
      },
      postItem: {
        isModalOpen: false
      }
    });
  });

  it('renders without crashing', async () => {
    store = mockStore({
      posts: {
        posts: [],
        loading: true, // Ensure loading is true to display the loading text
        error: null,
        after: null,
        selectedSubreddit: null
      },
      postItem: {
        isModalOpen: false
      }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText('Loading')).toBeInTheDocument(); // Use findByText for async elements
    expect(screen.getByText('You reached bottom D:')).toBeInTheDocument();
  });

  it('displays error message when there is an error', () => {
    store = mockStore({
      posts: {
        posts: [],
        loading: false,
        error: 'Error fetching posts',
        after: null,
        selectedSubreddit: null
      },
      postItem: {
        isModalOpen: false
      }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Error: Error fetching posts')).toBeInTheDocument();
  });

  it('renders PostComments when modal is open', async () => {
    store = mockStore({
      posts: {
        posts: [],
        loading: false,
        error: null,
        after: null,
        selectedSubreddit: null
      },
      postItem: {
        post: { 
          id: '1', 
          author: 'User', 
          title: 'Sample Post', 
          subreddit_name_prefixed: 'r/example', 
          created: Date.now() / 1000 ,
          url: 'https://www.example.com',
          thumbnail: 'https://www.example.com/image.jpg',
          permalink: 'https://www.example.com/permalink',
          ups: 100,
          num_comments: 10
        },
        isModalOpen: true
      },
      comments: {
        comments: [{ id: '1', author: 'User', body: 'Test comment' }],
        loading: false,
        error: null
      }
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(await screen.findByText('Comments')).toBeInTheDocument();
  });
});