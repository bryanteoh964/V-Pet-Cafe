const express = require('express')
const router = express.Router()
const axios = require('axios');
const jsonParser = require('body-parser').json()
require('dotenv').config();

const API_KEY = process.env.GPT_KEY
  
router.get('/:prompt', jsonParser, (req, res) => {
    const question = req.params.prompt;

    axios({
      method: 'post',
      url: 'https://api.openai.com/v1/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      data: {
        "model": "text-davinci-003",
        "prompt": `Speak like a cat. ${question}`,
        "max_tokens": 500,
        "temperature": 0
      }
    })
    .then(response => {
        res.send(response.data.choices[0].text)
    })
    .catch(error => {
        res.send(error)
    });
});

module.exports = router


