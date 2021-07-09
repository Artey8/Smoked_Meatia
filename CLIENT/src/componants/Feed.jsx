import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Post from './Post';

const Feed = (props) => {
  const { user, currentUserId } = props;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('/posts')
    .then(({ data }) => {
      setPosts(data.rows);
    }).catch((err) => {
      console.error(err);
      alert('Couldn\' load the feed.')
    })
  }, [props])

  return (
    <div id="feed">
      <button
        id="Create-Post"
        onClick={(e) => {
          props.setCreateClicked(true);
        }}
      >
        Make Post
      </button>
      {posts.map((post) => (
        <Post currentUserId={currentUserId} currentUserName={user} key={post.id} data={post}/>
      ))}
    </div>
  )
}

export default Feed