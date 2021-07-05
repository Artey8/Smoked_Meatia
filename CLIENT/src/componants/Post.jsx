import React from 'react';

const Post = (props) => {
  return (
    <div className="post">
      <p className="post-title">{props.data.user} posted:</p>
      {props.data.post.images.map((image, i) => (
        <img key={i} className="post-image" src={image} alt="no images" />
      ))}
      <p className="post-text">{props.data.post.message}</p>
      <div className="post-buttons">
        <img className="post-button like"src="https://img.icons8.com/material-sharp/24/000000/facebook-like--v1.png"/>
        <img className="post-button dislike"src="https://img.icons8.com/material-sharp/24/000000/thumbs-down.png"/>
        <img className="post-button comment"src="https://img.icons8.com/windows/32/000000/comments--v1.png"/>
      </div>
    </div>
  )
}

export default Post;