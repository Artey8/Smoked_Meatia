const { pool } = require('../index.js');

const addUser = ({ name }) => {
  let query = {
    text: 'INSERT INTO users(name) VALUES($1)',
    values: [name],
  }
  return new Promise((resolve, reject) => {
    pool.query(query)
    .then((data) => {
      resolve(data);
    }).catch((err) => {
      console.error(err);
      reject(err);
    })
  });
};

const getUsers = (() => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM users`)
    .then((data) => {
      resolve(data);
    }).catch((err) => {
      reject(err);
    })
  })
})

module.exports = {
  addUser,
  getUsers,
}