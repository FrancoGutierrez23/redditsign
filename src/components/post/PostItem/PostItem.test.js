import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import PostItem from './PostItem';
import { selectPost, fetchComments } from '../../../redux/postItemSlice';
import upVotes from '../../../assets/up_votes.png';
import downVotes from '../../../assets/down_votes.png';
import turnOffArrow from '../../../assets/turn_off_arrow.png';
import commentsIcon from '../../../assets/comments.jpg';
import { timeAgo, formatRedditText } from '../../utils';

// Mocking the useDispatch hook and the actions
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('../../../redux/postItemSlice', () => ({
  selectPost: jest.fn(),
  fetchComments: jest.fn(),
}));

jest.mock('../../utils', () => ({
  timeAgo: jest.fn(),
  formatRedditText: jest.fn(),
}));

const mockPost = {
  author: 'test_author',
  subreddit_name_prefixed: 'r/testsubreddit',
  title: 'Test Post Title',
  url: 'https://example.com/test.jpg',
  ups: 123,
  num_comments: 456,
  created: 1627689901,
  permalink: '/r/testsubreddit/comments/testpost',
  selftext: 'Test post content',
  thumbnail: 'https://example.com/thumbnail.jpg',
  thumbnail_width: 100,
  thumbnail_height: 100,
  is_video: false,
};

describe('PostItem Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    timeAgo.mockReturnValue('2 hours ago');
    formatRedditText.mockReturnValue('Test post content');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with post data', () => {
    render(<PostItem post={mockPost} />);

    expect(screen.getByText(/test_author in/i)).toBeInTheDocument();
    expect(screen.getByText(/r\/testsubreddit/i)).toBeInTheDocument();
    expect(screen.getByText('2 hours ago')).toBeInTheDocument();
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText((content, element) => element.tagName.toLowerCase() === 'div' && content.includes('Test post content'))).toBeInTheDocument();
    expect(screen.getByAltText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByAltText('up votes')).toHaveAttribute('src', turnOffArrow);
    expect(screen.getByAltText('down votes')).toHaveAttribute('src', turnOffArrow);
    expect(screen.getByText('123')).toBeInTheDocument();
    expect(screen.getByAltText('comments')).toHaveAttribute('src', commentsIcon);
    expect(screen.getByText('456')).toBeInTheDocument();
  });

  it('handles upvote and downvote clicks', () => {
    render(<PostItem post={mockPost} />);

    const upvoteButton = screen.getByRole('button', { name: /up votes/i });
    const downvoteButton = screen.getByRole('button', { name: /down votes/i });
    let voteCount = screen.getByText('123');

    // Test upvote click
    fireEvent.click(upvoteButton);
    voteCount = screen.getByText('124');
    expect(voteCount).toBeInTheDocument();
    expect(screen.getByAltText('up votes')).toHaveAttribute('src', upVotes);

    // Test upvote click again to undo upvote
    fireEvent.click(upvoteButton);
    voteCount = screen.getByText('123');
    expect(voteCount).toBeInTheDocument();
    expect(screen.getByAltText('up votes')).toHaveAttribute('src', turnOffArrow);

    // Test downvote click
    fireEvent.click(downvoteButton);
    voteCount = screen.getByText('122');
    expect(voteCount).toBeInTheDocument();
    expect(screen.getByAltText('down votes')).toHaveAttribute('src', downVotes);

    // Test downvote click again to undo downvote
    fireEvent.click(downvoteButton);
    voteCount = screen.getByText('123');
    expect(voteCount).toBeInTheDocument();
    expect(screen.getByAltText('down votes')).toHaveAttribute('src', turnOffArrow);
  });

  it('dispatches selectPost and fetchComments on comments click', () => {
    render(<PostItem post={mockPost} />);

    const commentsButton = screen.getByRole('button', { name: /comments/i });
    fireEvent.click(commentsButton);

    // Ensure the correct actions were dispatched with the correct payloads
    expect(selectPost).toHaveBeenCalledWith(mockPost);
    expect(fetchComments).toHaveBeenCalledWith(mockPost.permalink);
  });
});
