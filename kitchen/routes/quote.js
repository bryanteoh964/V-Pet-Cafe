const express = require('express');
const router = express.Router();
const jsonParser = require('body-parser').json();
const axios = require('axios');

const API_KEY = process.env.QUOTE_KEY
const catUrl = 'http://localhost:3000/cat/';
const prompt = "Say this quote:"
  
router.get('/:type', jsonParser, (req, res) => {
    const type = req.params.type;

    axios({
      method: 'get',
      url: `https://api.api-ninjas.com/v1/quotes?category=${type}`,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY
    }})
    .then(response => {
        const gptRes = axios({
            method: 'get',
            url: `${catUrl}${prompt}"${response.data[0].quote}"`,
        })
        
        gptRes.then(response2 => {
            res.send({quote: response2.data, author: response.data[0].author})
        }).catch(error2 => {
            res.send(error2)
        })
    })
    .catch(error => {
        res.send(error)
    });
});

module.exports = router