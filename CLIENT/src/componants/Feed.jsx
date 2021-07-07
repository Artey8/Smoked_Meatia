import React, { useState, useEffect } from 'react';
import Post from './Post';

const Feed = (props) => {

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

      {props.data.map((post) => (
        <Post key={post.id} data={post}/>
      ))}
    </div>
  )
}

export default Feed