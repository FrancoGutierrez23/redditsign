// src/components/layout/Subreddits/SubredditList.test.js
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import SubredditList from './SubredditList';


// Create mock functions
const mockDispatch = jest.fn();
const mockUseSelector = jest.fn();

// Mock Redux hooks
jest.mock('react-redux', () => ({
  useSelector: () => mockUseSelector(),
  useDispatch: () => mockDispatch
}));

describe('SubredditList', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    mockDispatch.mockClear();
    mockUseSelector.mockClear();
  });

  it('should render and toggle list visibility', () => {
    // Setup mock return values as needed
    mockUseSelector.mockReturnValue({ /* Mock necessary initial state here */ });

    render(<SubredditList />);
    const titleElement = screen.getByText('Subreddits');
    fireEvent.click(titleElement);
    expect(screen.getByText('Subreddits')).toBeInTheDocument(); // Adjust text based on your component

    fireEvent.click(titleElement);
    expect(screen.queryByText('Choose subreddit')).not.toBeInTheDocument();
  });

  it('handles subreddit selection', () => {
    // Setup mock return values as needed
    mockUseSelector.mockReturnValue({ /* Mock necessary initial state here */ });

    render(<SubredditList />);
    fireEvent.click(screen.getByText('Subreddits')); // Opens the dropdown
    fireEvent.click(screen.getByText('pics')); // Click on the subreddit
    expect(mockDispatch).toHaveBeenCalledTimes(2); // Adjust based on your actual calls in component
  });
});
