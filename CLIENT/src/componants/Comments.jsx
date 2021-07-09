import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comment from './Comment';

const Comments = (props) => {
  const { post_id, user_id } = props;
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [submitClicked, setSubmitClicked] = useState(false);

  useEffect(() => {
    //console.log(user_id)
    if (submitClicked) {
      axios.post(`/comments`, {
        user_id,
        comment,
        post_id,
      }).then(() => {
        setComments([...comments, { user_id, comment: comment}])
        setComment('');
        setSubmitClicked(false);
      }).catch((err) => {
        console.error(err);
        alert('Could,\'t post comment');
      })
    }
  }, [submitClicked])

  useEffect(() => {
    axios.get(`/comments?post_id=${post_id}`)
    .then((res) => {
      console.log('loaded comments')
      setComments(res.data.rows);
    }).catch((err) => {
      console.error(err);
      alert('Something went wront loading the comments!')
    })
  }, [props])

  const validate = () => {
    return new Promise((resolve) => {
      let result = {
        valid: true,
        message: '',
      };
      if (
        comment.indexOf('<script/>') > -1 ||
        comment.indexOf('<script>') > -1 ||
        comment.indexOf('</script>') > -1
        ) {
        result.valid = false;
        result.message = 'No Scripting Please';
        setComment('');
      } else if (comment.length < 3) {
        result.valid = false;
        result.message = 'Comment must be at least 3 letters';
      }
      resolve(result);
    })
  }

  return (
    <div className="comment-section">
      {console.log(comments)}
      {comments.map((comment, i) => (
        <Comment data={comment} key={i} />
      ))}
      <div className="comment-form">
      <input
        type="text"
        className="comment-input"
        value={comment}
        maxLength="100"
        placeholder="add a comment"
        onChange={(e) => {
          setComment(e.target.value);
        }}
      />
      <button
        className="submit-comment"
        type="button"
        onClick={() => {
          validate()
          .then(({ valid, message }) => {
            if (!valid) {
              alert(message);
            } else {
              setSubmitClicked(true);
            }
          })
        }}
      >
        Post!
      </button>
      </div>
    </div>
  )
}

export default Comments;