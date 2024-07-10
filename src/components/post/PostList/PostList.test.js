// src/components/post/PostList/PostList.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from './PostList';
import { fetchPosts } from '../../../redux/postsSlice';
import useInfiniteScroll from '../../../hooks/useInfiniteScroll';

// Mocking the useDispatch and useSelector hooks
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

// Mocking the fetchPosts action
jest.mock('../../../redux/postsSlice', () => ({
  fetchPosts: jest.fn(),
}));

// Mocking the useInfiniteScroll hook
jest.mock('../../../hooks/useInfiniteScroll', () => jest.fn());

const mockPosts = [
  {
    data: {
      id: '1',
      name: 't3_post1',
      title: 'Test Post 1',
      author: 'test_author1',
      subreddit_name_prefixed: 'r/testsubreddit1',
      ups: 123,
      num_comments: 456,
      created: 1627689901,
      permalink: '/r/testsubreddit1/comments/testpost1',
      selftext: 'Test post content 1',
      thumbnail: 'https://example.com/thumbnail1.jpg',
      thumbnail_width: 100,
      thumbnail_height: 100,
      is_video: false,
      url: 'https://example.com/test1.jpg', // Ensure url is included
    },
  },
  {
    data: {
      id: '2',
      name: 't3_post2',
      title: 'Test Post 2',
      author: 'test_author2',
      subreddit_name_prefixed: 'r/testsubreddit2',
      ups: 456,
      num_comments: 789,
      created: 1627689902,
      permalink: '/r/testsubreddit2/comments/testpost2',
      selftext: 'Test post content 2',
      thumbnail: 'https://example.com/thumbnail2.jpg',
      thumbnail_width: 100,
      thumbnail_height: 100,
      is_video: false,
      url: 'https://example.com/test2.jpg', // Ensure url is included
    },
  },
];

describe('PostList Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();

    useDispatch.mockReturnValue(mockDispatch);
    useSelector.mockImplementation((selector) => {
      if (selector.toString().includes('after')) {
        return 'test_after';
      }
      if (selector.toString().includes('selectedSubreddit')) {
        return 'testsubreddit';
      }
      return [];
    });
    useInfiniteScroll.mockImplementation((callback) => {
      const [isFetching, setIsFetching] = React.useState(false);

      React.useEffect(() => {
        const handleScroll = () => {
          console.log('Scroll event fired');
          if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
            return;
          }
          setIsFetching(true);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [isFetching]);

      React.useEffect(() => {
        if (!isFetching) return;
        const fetchData = async () => {
          console.log('Callback called');
          await callback();
          setIsFetching(false);
        };
        fetchData();
      }, [isFetching, callback]);

      return [isFetching];
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of posts', () => {
    render(<PostList posts={mockPosts} />);

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('displays fallback text when no posts are available', () => {
    render(<PostList posts={[]} />);

    expect(screen.getByText('No posts available.')).toBeInTheDocument();
  });

  it('fetches more posts on scroll', async () => {
    render(<PostList posts={mockPosts} />);

    // Manually invoke the fetchMorePosts callback
    const fetchMorePosts = useInfiniteScroll.mock.calls[0][0];
    await fetchMorePosts();

    expect(mockDispatch).toHaveBeenCalledWith(fetchPosts({ subreddit: 'testsubreddit', after: 'test_after' }));
  });
});