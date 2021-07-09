import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Comment = (props) => {
  const { comment, user_id } = props.data;
  const [userName, setUserName] = useState('Anonymous');

  useEffect(() => {
    axios.get('/users', {
      params: {
        all: true
      }
    }).then((res) => {
      const users = res.data.rows;
      for (let k = 0; k < users.length; k++) {
        console.log(users[k])
        if (users[k].id === user_id) {
          if (users[k].name.length > 0) {
            setUserName(users[k].name)
          }
        }
      }
    }).catch((err) => {
      console.error(err);
    })
  }, [props])

  useEffect(() => {
    console.log(userName)
  }, [userName])

  return (
  <div className="comment">
    <h2 className="comment-text">{userName}: {comment}</h2>
  </div>
  )
}

export default Comment;