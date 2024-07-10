import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import PostComments from './PostComments';

const mockStore = configureStore([]);

describe('PostComments Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      postItem: {
        post: { id: 1, title: 'Test Post' },
        comments: [
          { id: 1, body: 'Test comment', body_html: '<p>Test comment</p>', author: 'user1' },
          { id: 2, body: 'Another test comment', body_html: '<p>Another test comment</p>', author: 'user2' }
        ],
        loading: false,
        error: null,
        isModalOpen: true
      }
    });
  });

  it('renders comments when modal is open', () => {
    render(
      <Provider store={store}>
        <PostComments />
      </Provider>
    );
    expect(screen.getByText('Comments')).toBeInTheDocument();
    expect(screen.getByText('Test comment')).toBeInTheDocument();
    expect(screen.getByText('Another test comment')).toBeInTheDocument();
  });

  it('does not render when isModalOpen is false', () => {
    store = mockStore({
      postItem: {
        post: {},
        comments: [],
        loading: false,
        error: null,
        isModalOpen: false
      }
    });

    render(
      <Provider store={store}>
        <PostComments />
      </Provider>
    );

    // Check if 'Comments' text is not present in the document
    expect(screen.queryByText('Comments')).toBeNull();
  });

  it('displays a loading indicator when comments are being loaded', () => {
    store = mockStore({
      postItem: {
        post: {},
        comments: [],
        loading: true,
        error: null,
        isModalOpen: true
      }
    });

    render(
      <Provider store={store}>
        <PostComments />
      </Provider>
    );

    // Check for the presence of the loader element instead of the text
    const loader = screen.getByTestId('comments-loader');
    expect(loader).toBeInTheDocument();
  });

  it('displays an error message when there is an error loading comments', () => {
    store = mockStore({
      postItem: {
        post: {},
        comments: [],
        loading: false,
        error: 'Error fetching comments',
        isModalOpen: true
      }
    });

    render(
      <Provider store={store}>
        <PostComments />
      </Provider>
    );

    expect(screen.getByText('Error loading comments: Error fetching comments')).toBeInTheDocument();
  });

  it('closes the modal on close button click', () => {
    render(
      <Provider store={store}>
        <PostComments />
      </Provider>
    );
    fireEvent.click(screen.getByText('X'));
    expect(store.getActions()).toContainEqual({ type: 'postItem/closeCommentsModal' });
  });
});