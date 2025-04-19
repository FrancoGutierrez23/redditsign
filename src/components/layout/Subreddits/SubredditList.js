import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { fetchPosts, resetPosts } from "../../../redux/postsSlice";
import "./SubredditList.css";
import { MdOutlineMenuOpen } from "react-icons/md";

const SubredditList = () => {
  const dispatch = useDispatch();
  const [selectedSubreddit, setSelectedSubreddit] = useState("pics");
  const [isListVisible, setIsListVisible] = useState(false);
  const listRef = useRef(null);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  console.log(width);

  useEffect(() => {
    dispatch(resetPosts()); // Reset posts when subreddit changes
    dispatch(fetchPosts({ subreddit: selectedSubreddit, after: null }));

    // Scroll to the top of the entire page when the subreddit changes
    window.scrollTo(0, 0);
  }, [dispatch, selectedSubreddit]);

  const toggleListVisibility = () => {
    setIsListVisible((prev) => !prev); // Toggle the visibility state
  };

  const handleSubredditClick = (sub) => {
    if (sub === "pics") {
      window.location.reload();
    } else {
      setSelectedSubreddit(sub);
    }
    setIsListVisible(false); // Hide the list when a subreddit is selected
  };

  const handleClickOutside = (event) => {
    if (listRef.current && !listRef.current.contains(event.target)) {
      setIsListVisible(false); // Hide the list if the click is outside the container
    }
  };

  useEffect(() => {
    if (isListVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isListVisible]);

  return (
    <aside className="subreddits_list" ref={listRef}>
      {width > 600 ? (
        <div className="menu" onClick={toggleListVisibility}>
          <MdOutlineMenuOpen className="menu_logo" />

          <h3 className="subreddits_title" onClick={toggleListVisibility}>
            Subreddits
          </h3>
        </div>
      ) : (
        <div className="menu" onClick={toggleListVisibility}>
          <MdOutlineMenuOpen className="menu_logo" />
        </div>
      )}

      {isListVisible && (
        <div className="subreddits_options_container">
          {[
            "pics",
            "funny",
            "nature",
            "technology",
            "gaming",
            "paranormal",
            "news",
            "AskReddit",
            "aww",
            "todayilearned",
            "science",
            "movies",
          ].map((sub) => (
            <button
              key={sub}
              className={`subreddit_option ${
                selectedSubreddit === sub ? "active" : "not_active"
              }`}
              onClick={() => handleSubredditClick(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
};

export default React.memo(SubredditList);
