const express = require('express');
const app = express()
const port = 3000
const path = require('path');

app.use(express.static(path.join(__dirname, '/../CLIENT/dist/')));

app.get('/posts', (req, res) => {
  res.sendStatus(200);
})

app.post('/posts', (req, res) => {
  res.sendStatus(201);
})

app.delete('/posts', (req, res) => {
  res.sendStatus(200);
})

app.put('/posts', (req, res) => {
  res.sendStatus(201);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
