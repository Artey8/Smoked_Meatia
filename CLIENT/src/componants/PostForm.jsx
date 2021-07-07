import React from 'react';

const PostForm = (props) => {
  return (
    <div>
      <label className="post-form-label">Message</label>
      <textarea col="40" maxLength="100" placeHolder="Say whatever meaty things are on your mind" type="text" className="post-form-input"></textarea>
      <label className="post-form-label">Upload an Image</label>
      <input type="file" accept="image/png, image/jpeg, image/heic" className="post-form-input"></input>
      <button className="post-form-input" id="post-form-submit" type="button">Post!</button>
    </div>
  );
}

export default PostForm;