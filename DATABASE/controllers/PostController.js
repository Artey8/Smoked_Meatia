const { pool } = require('../index.js');

const getPosts = (count) => {
  let querySting = `SELECT * FROM post ORDER BY id DESC LIMIT ${count}`;
  return new Promise((resolve, reject) => {
    pool.query(querySting)
    .then((res) => {
      resolve(res)
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  })
}

const addPost = ({ message, photo, user}) => {
  let query = {
    text: `INSERT INTO posts(message, photo_url, user_id, likes, dislikes) VALUES($1, $2, (SELECT id FROM users WHERE name = '${user}'), $3, $4)`,
    values: [message, photo, '0', '0']
  }
  return new Promise((resolve, reject) => {
    pool.query(query)
    .then(() => {
      resolve('success');
    }).catch((err) => {
      console.error(err)
      reject(err);
    })
  });
};

module.exports = {
  addPost,
  getPosts,
}