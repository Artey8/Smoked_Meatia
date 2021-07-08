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

const getUser = ((params) => {
  return new Promise((resolve, reject) => {
    if (params.all) {
      pool.query('SELECT * FROM users')
      .then((data) => {
        resolve(data);
      }).catch((err) => {
        reject(err);
      })
    } else if (params.id !== 'undefined') {
      pool.query(`SELECT * FROM users WHERE id = ${id}`)
      .then((data) => {
        console.log('got here')
        console.log(data)
        resolve(data);
      }).catch((err) => {
        console.error(err);
        reject(err);
      })
    }
  })
})

module.exports = {
  addUser,
  getUser,
}