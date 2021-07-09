const { pool } = require('../index.js');

const addComment = ({ comment, user_id, post_id }) => {
  let query = {
    text: 'INSERT INTO comments(comment, user_id, post_id) VALUES($1, $2, $3)',
    values: [comment, user_id, post_id],
  }
  return new Promise((resolve, reject) => {
    pool.query(query)
    .then(() => {
      resolve('success');
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  });
};

const getComments = (({ post_id }) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM comments WHERE post_id = ${post_id}`)
    .then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
})

module.exports = {
  addComment,
  getComments,
}