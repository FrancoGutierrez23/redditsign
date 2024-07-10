// src/components/layout/Footer/Footer.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from './Footer';

describe('Footer Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with footer content', () => {
    render(<Footer />);
    expect(screen.getByText('You reached bottom D:')).toBeInTheDocument();
  });

  it('adds neon class when user reaches the bottom of the page', () => {
    render(<Footer />);
    
    // Mock window properties
    const originalInnerHeight = window.innerHeight;
    const originalScrollY = window.scrollY;
    const originalScrollHeight = document.documentElement.scrollHeight;

    Object.defineProperty(window, 'innerHeight', { value: 1000, writable: true });
    Object.defineProperty(window, 'scrollY', { value: 1000, writable: true });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: 2000, writable: true });

    // Trigger scroll event
    fireEvent.scroll(window);

    const footerMessage = screen.getByText('You reached bottom D:');
    expect(footerMessage).toHaveClass('neon');

    // Restore original values
    Object.defineProperty(window, 'innerHeight', { value: originalInnerHeight });
    Object.defineProperty(window, 'scrollY', { value: originalScrollY });
    Object.defineProperty(document.documentElement, 'scrollHeight', { value: originalScrollHeight });
  });
});
