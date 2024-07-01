export const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp * 1000); // Convert epoch seconds to milliseconds
    const difference = Math.floor((now - postDate) / 1000); // Difference in seconds
  
    // Calculate time difference in human-readable format
    if (difference < 60) {
      return `${difference} seconds ago`;
    } else if (difference < 3600) {
      const minutes = Math.floor(difference / 60);
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (difference < 86400) {
      const hours = Math.floor(difference / 3600);
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else if (difference < 604800) { // Less than a week
      const days = Math.floor(difference / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (difference < 2592000) { // Less than a month
      const weeks = Math.floor(difference / 604800);
      return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else if (difference < 31536000) { // Less than a year
      const months = Math.floor(difference / 2592000);
      return `${months} month${months !== 1 ? 's' : ''} ago`;
    } else {
      const years = Math.floor(difference / 31536000);
      return `${years} year${years !== 1 ? 's' : ''} ago`;
    }
  };


export const formatRedditText = (text) => {
  const paragraphs = text.split('\n\n').map((paragraph, index) => `<p key=${index === 0? 'first' : 'noFirst'}>${paragraph}</p>`).join('');
  return paragraphs;
};
