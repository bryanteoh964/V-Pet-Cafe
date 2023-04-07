const express = require('express');
const router = express.Router();
const axios = require('axios');
const jsonParser = require('body-parser').json()
require('dotenv').config();

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

function generateRandomString(length) {
    let res = '';
    const char_list = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
        res += char_list.charAt(Math.floor(Math.random() * char_list.length));
        }
        return res;
    }

router.get('/getAuthURl', (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-email';

  const queryParams = new URLSearchParams({
      client_id: CLIENT_ID,
      response_type: 'code',
      redirect_uri: REDIRECT_URI,
      state: state,
      scope: scope,
    });
  
  res.send(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get('/getToken/:code', jsonParser, (req, res) => {
  const code = req.params.code;

  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`,
    },
  })
    .then(response => {
      if (response.status === 200) {
        res.send(response.data);
      } else {
        res.send(response);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/getUser/:user/:auth', jsonParser, (req, res) => {
  const user = req.params.user;
  const auth = req.params.auth;

  axios.get(`https://api.spotify.com/v1/users/${user}`, {
        headers: {
          Authorization: `Bearer ${auth}`
        }
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.send(error);
  });
})

module.exports = router;