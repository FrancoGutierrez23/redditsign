// src/components/layout/Header/Header.test.js
import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import Header from './Header';
import SubredditList from '../Subreddits/SubredditList';
import logo from '../../../assets/logo_64px.jpeg'; 
import searchIcon from '../../../assets/search.png';

// Mocking the useDispatch hook
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

describe('Header Component', () => {
  let wrapper;
  let mockDispatch;

  beforeEach(() => {
    mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);
    wrapper = shallow(<Header />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with logo and search elements', () => {
    expect(wrapper.find('.logo img').prop('src')).toBe(logo);
    expect(wrapper.find('.search_button img').prop('src')).toBe(searchIcon);
    expect(wrapper.find(SubredditList).exists()).toBe(true);
  });

  it('handles search input and submit', () => {
    const searchInput = wrapper.find('.search_box');
    const searchForm = wrapper.find('form[name="search"]');

    searchInput.simulate('change', { target: { value: 'test query' } });
    expect(wrapper.find('.search_box').prop('value')).toBe('test query');

    searchForm.simulate('submit', { preventDefault: jest.fn() });
    expect(mockDispatch).toHaveBeenCalled();
  });

  it('toggles search input visibility on button click', () => {
    const searchButton = wrapper.find('.search_button');
    searchButton.simulate('click');
    expect(wrapper.find('.search_box').hasClass('active')).toBe(true);
  });

  it('handles logo click (page reload)', () => {
    const reloadSpy = jest.spyOn(window.location, 'reload').mockImplementation(() => {});
    wrapper.find('.logo').simulate('click');
    expect(reloadSpy).toHaveBeenCalled();
    reloadSpy.mockRestore();
  });

  it('closes search input when clicking outside', () => {
    const event = new MouseEvent('mousedown');
    document.dispatchEvent(event);
    expect(wrapper.find('.search_box').hasClass('active')).toBe(false);
  });
});
