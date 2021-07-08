import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Post = (props) => {
  const { photo_url, message, user_id, likes, dislikes, id } = props.data;
  const [user, setUser] = useState('No UserName');
  const [likesState, setLikes] = useState(likes);
  const [dislikesState, setDislikes] = useState(dislikes);
  const [likeClicked, setLikeClicked] = useState(false);
  const [dislikeClicked, setDislikeClicked] = useState(false);
  const [postImageID, setPostImageId] = useState('');

  useEffect(() => {
    axios.get('/users', {
      params: {
        id: user_id,
        all: false
      }
    })
    .then((res) => {
      for (let k = 0; k < res.data.rows.length; k++) {
        if (user_id === res.data.rows[k].id) {
          setUser(res.data.rows[k].name);
        }
      }
    })
  }, [props.data])

  useEffect(() => {
    console.log(postImageID)
  }, [postImageID])

  useEffect(() => {
    if (likeClicked) {
      axios.put(`posts/likes?post_id=${id}`)
      .then(() => {
        setLikes(likes + 1);
      }).catch((err) => {
        console.error(err);
      })
    }
    if (dislikeClicked) {
      axios.put(`posts/dislikes?post_id=${id}`)
      .then(() => {
        setDislikes(dislikes + 1);
      }).catch((err) => {
        console.error(err);
      })
    }
  }, [likeClicked, dislikeClicked])

  useEffect(() => {

  }, [dislikeClicked])

  return (
    <div className="post">
      <p className="post-title">{user} posted:</p>
      {photo_url.length > 0 && (
        <img
          id={postImageID}
          className="post-image"
          src={photo_url}
          alt="no images"
          onClick={() => {
            if (postImageID === '') {
              console.log(
                'clicked!'
              )
              setPostImageId('post-image-selected')
            } else {
              setPostImageId('')
            }
          }}
        />
      )}
      <p className="post-text">{message}</p>
      <div className="post-likes-section">
        <p className="post-likes">likes: {likesState}</p>
        <p className="post-dislikes">dislikes: {dislikesState}</p>
      </div>
      <div className="post-buttons">
        <img
          className="post-button like"
          src="https://img.icons8.com/material-sharp/24/000000/facebook-like--v1.png"
          onClick={(e) => {
            if (!likeClicked) {
              setLikeClicked(true);
            }
          }}
        />
        <img
          className="post-button comment"
          src="https://img.icons8.com/windows/32/000000/comments--v1.png"
          onClick={(e) => {

          }}
        />
        <img
          className="post-button dislike"
          src="https://img.icons8.com/material-sharp/24/000000/thumbs-down.png"
          onClick={(e) => {
            if (!dislikeClicked) {
              setDislikeClicked(true);
            }
          }}
        />
      </div>
    </div>
  )
}

export default Post;