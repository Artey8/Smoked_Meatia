const { Pool, Client } = require('pg');

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'smoked_meatia',
  password: '',
  port: '5432',
});

pool.query(`
CREATE TABLE IF NOT EXISTS users (
  id SERIAL NOT NULL PRIMARY KEY,
  name VARCHAR ( 50 ) NOT NULL
)
`).then(() => {
  pool.query(`
    CREATE TABLE IF NOT EXISTS posts (
      id SERIAL NOT NULL PRIMARY KEY,
      user_id INTEGER NOT NULL REFERENCES users ( id ),
      message VARCHAR ( 200 ),
      photo_url VARCHAR ( 150 ),
      likes INTEGER NOT NULL,
      dislikes INTEGER NOT NULL
      )
    `).catch((err) => {
      console.error(err);
    })
  })

module.exports.pool = pool;