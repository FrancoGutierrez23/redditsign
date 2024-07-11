# Redditsign

This is a portfolio project that consists of a redesign of the Reddit web using the Reddit JSON API. The project allows users to browse posts from various subreddits, view comments, and interact with posts through voting. 

You can view the live project [here](https://main--redditsign.netlify.app).

## Table of Contents
- [Features](#features)
- [Components](#components)
- [Installation](#installation)
- [Usage](#usage)
- [Future Features](#future-features)

## Features
- Browse posts from various subreddits
- View comments on posts
- Upvote and downvote posts
- Search for specific subreddits and posts
- Responsive design

## Components
### Header
- Displays the logo
- Handles the search function
- Displays the `SubredditList` (a dropdown list with the prefixed subreddits to navigate to)

### SubredditList
- A list of possible subreddits to navigate to
- Manages the subreddit change and the `selectedSubreddit` state

### Footer
- Displays a simple span element

### PostItem
- Manages the logic of each post
- Displays author, subreddit where it was posted, time ago, title, text (if any), media (image or video, if any)
- Handles votes (with the possibility to upvote or downvote)
- Comments button (on click, displays the `PostComments` component showing the post and comments)

### PostList
- Displays a list of `PostItem` components for each post object returned by the API

### PostComments
- Displays a modal when clicked in certain parts of the `PostItem` showing the full post and comments

### App
- Renders all the above components in the right order

## Installation
To run this project locally, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/FrancoGutierrez23/redditsign.git
    ```
2. Navigate to the project directory:
    ```sh
    cd redditsign
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the development server:
    ```sh
    npm start
    ```
**Note:** You can launch the test runner with `npm test`. Each component have a test file.

## Usage
- The app will start on `http://localhost:3000`
- Use the search bar in the `Header` to find specific content
- Navigate through the subreddit list using the `SubredditList` dropdown
- Click on a post’s comment button to view comments in a modal
- Upvote or downvote posts using the vote buttons

## Future Features
- Zoom on images
- Display galleries
- Personalize subreddit list
- Ability to navigate to a subreddit by clicking the subreddit name in a post
- Ability to comment

