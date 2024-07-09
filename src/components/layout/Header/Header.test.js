// src/components/layout/Header/Header.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import Header from './Header';
import logo from '../../../assets/logo_64px.jpeg';
import searchIcon from '../../../assets/search.png';

// Mocking the useDispatch hook
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Header Component', () => {
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with logo and search elements', () => {
    render(<Header />);
    expect(screen.getByAltText('logo')).toHaveAttribute('src', logo);
    expect(screen.getByAltText('search')).toHaveAttribute('src', searchIcon);
    expect(screen.getByRole('complementary')).toBeInTheDocument();
  });

  it('handles search input and submit', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    const searchForm = screen.getByRole('form');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect(searchInput.value).toBe('test query');

    fireEvent.submit(searchForm);
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('toggles search input visibility on button click', () => {
    render(<Header />);
    const searchButton = screen.getByRole('button', { name: /search/i });
    fireEvent.click(searchButton);
    expect(screen.getByPlaceholderText('Search posts...')).toHaveClass('active');
  });

  it('handles logo click (page reload)', () => {
    render(<Header />);
    fireEvent.click(screen.getByAltText('logo'));
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('closes search input when clicking outside', () => {
    render(<Header />);
    const searchInput = screen.getByPlaceholderText('Search posts...');
    fireEvent.click(document);
    expect(searchInput).not.toHaveClass('active');
  });
});
