const express = require('express');
const router = express.Router();

const axios = require('axios');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const checkAuthorization = require('./checkauth');

const jsonParser = require('body-parser').json();
require('dotenv').config();

const User = require("../models/user");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const JWT_SECRET = process.env.JWT_SECRET;

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
        const { access_token, token_type } = response.data;
        axios.get('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `${token_type} ${access_token}`
          }
        }).then(async response => {
          const resp = response.data

          const hash = crypto.createHash('sha256')
          hash.update(access_token);
          const accessTokenHash = hash.digest('hex')

          try {
            const user = await User.findOneAndUpdate({email: resp.email}, {
              email: resp.email,
              name: resp.display_name,
              spotifyAccessToken: access_token,
              spotifyAccessTokenHash: accessTokenHash
            }, 
            {'upsert': 'true'}) 
          } catch (err) {
              console.log(err);
          }
          
          const jwtPayload = {
            spotifyAccessTokenHash: accessTokenHash 
          };

          const authJwToken = jwt.sign(jwtPayload, JWT_SECRET)
          res.send(authJwToken);

        }).catch(error => {
          res.send(error)
        })
      } else {
        res.send(response);
      }
    })
    .catch(error => {
      res.send(error);
    });
});

router.get('/getUser/:user', checkAuthorization, jsonParser, (req, res) => {
  const user = req.params.user;
  const auth = req.user.spotifyAccessToken;

  axios.get(`https://api.spotify.com/v1/users/${user}`, {
        headers: {
          Authorization: `Bearer ${auth}`
        }
  }).then(response => {
    res.send(response.data);
  }).catch(error => {
    res.send(error);
  });
});

router.get("/username", checkAuthorization, async (req, res) => {
  const user = req.user
  res.send(user.name)
});

router.get('/logout', checkAuthorization, async (req, res) => {
    const userJWT = req.headers.authorization
    const userJWTPayload = jwt.verify(userJWT, JWT_SECRET)
    try {
      await User.findOneAndUpdate({spotifyAccessTokenHash: userJWTPayload.spotifyAccessTokenHash},
        {spotifyAccessToken: null})
      console.log('done')
      res.send('done')
    } catch (err) {
      console.log(err)
      res.send(err)
    }
});

module.exports = router;



