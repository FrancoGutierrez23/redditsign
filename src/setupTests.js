import "@testing-library/jest-dom";

// Mocking global functions and properties
window.scrollTo = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    ...window.location,
    reload: jest.fn(),
  },
  writable: true,
});
