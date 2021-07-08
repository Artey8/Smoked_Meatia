const express = require('express');
const bodyParser = require('body-parser');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const app = express();
const port = 3000;
const path = require('path');
const { addPost, getPosts, updateLikes, updateDislikes } = require('../DATABASE/controllers/PostController');
const { addUser, getUser } = require('../DATABASE/controllers/UserController');

app.use(express.static(path.join(__dirname, '/../CLIENT/dist/')));
app.use(bodyParser.json({ limit: '2mb'}))

app.get('/posts', async (req, res) => {
  let count = req.body.count || req.query.count || 20
  try {
    let data = await getPosts(count)
    res.send(data);
  } catch(err) {
    console.error(err)
    res.sendStatus(400);
  }
})

app.post('/posts', async (req, res) => {
  try {
    await addPost(req.body)
    res.sendStatus(201)
  } catch(err) {
    console.error(err);
    res.sendStatus(400)
  }
})

app.delete('/posts', (req, res) => {
  res.sendStatus(200);
})

app.put('/posts/likes', async (req, res) => {
  try {
    await updateLikes(req.query);
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})
app.put('/posts/dislikes', async (req, res) => {
  try {
    await updateDislikes(req.query);
    res.sendStatus(201)
  } catch (err) {
    console.error(err)
    res.sendStatus(400)
  }
})

app.get('/users', async (req, res) => {
  try {
    let result = await getUser(req.query);
    res.send(result);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.post('/users', async (req, res) => {
  try {
    await addUser(req.body)
    res.sendStatus(200);
  } catch(err) {
    console.error(err);
    res.sendStatus(400);
  }
});

app.post('/photos', (req, res) => {
  const { fileData } = req.body;
  let confObj = {
    cloud_name: `${process.env.CLOUD_NAME}`,
    api_key: `${process.env.API_KEY}`,
    api_secret: `${process.env.API_SECRET}`,
  };
  cloudinary.config(confObj);
  cloudinary.uploader.upload(fileData, (err, result) => {
    if (err) {
      console.error(err);
      res.sendStatus(400);
    } else {
      const transform = 'w_200,c_scale/';
      const insertInd = result.url.indexOf('upload/') + 7;
      const transformedUrl = result.url.slice(0, insertInd) + transform + result.url.slice(insertInd);
      res.status(200).send(transformedUrl);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
