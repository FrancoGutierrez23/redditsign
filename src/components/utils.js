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
    } else {
      const days = Math.floor(difference / 86400);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };
  