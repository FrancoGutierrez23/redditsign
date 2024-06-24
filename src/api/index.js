// src/api/index.js
export const fetchPostsData = async (subreddit = 'all') => {
    const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
    const data = await response.json();
    return data.data.children;
  };
  
  export const fetchPostCommentsData = async (permalink) => {
    const trimmedPermalink = permalink.slice(0, -1);
    const response = await fetch(`https://www.reddit.com${trimmedPermalink}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const data = await response.json();
    return data[1].data.children.map(child => child.data);
  };
  