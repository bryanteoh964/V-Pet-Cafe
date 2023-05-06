# V-Pet Cafe

Welcome to V-Pet Cafe! Our online interactive game-like simulator offers a relaxing experience where you can take care of your own personal pet cat. With V-Pet Cafe, you can feed your cat, play with it, and shower it to increase its stats. Our cat is powered by OpenAI’s Davinci Large Language Model API, making it smart and able to have conversations with you. You can also use our cat image API to find a date for your cat in the cafe playground. With OAuth user authentication using Spotify API, you can sign in to your unique account to access your personal cat and listen to your playlist. V-Pet Cafe is a stress reliever interactive gameplay website running on Vue, making it an enjoyable and entertaining way to unwind after a long day.

## Getting Started
### Prerequisites
* npm
```sh
npm install npm@latest -g
```

### Installing
1. Clone the repo
   ```sh
   git clone https://github.com/bryanteoh964/V-Pet-Cafe
   ```
2. Get free API Keys at [OpenAI Davinci](https://platform.openai.com/docs/models), [API Ninja Quote API](https://api-ninjas.com/api/quotes), [POSTMAN The Cat API](https://documenter.getpostman.com/view/4016432/RWToRJCq)
3. Generate MongoDB instance credentials
4. Generate Spotify Developer credentials
5. Enter your API keys (GPT_KEY, JWT_SECRET, DATE_KEY, QUOTE_KEY), MongoDB credentials (DB_USER, DB_PASS), and Spotify OAuth ids (CLIENT_ID, CLIENT_SECRET) into a local .env file
6. Start the backend server (kitchen)
   ```js
   cd kitchen
   npm install
   nodemon
   ```
7. Start the frontend server (cafe)
   ```sh
   cd cafe
   npm install
   npm run dev
   ```

## Built With
[![Node][Node.js]][Node-url]
[![Express][Express.js]][Express-url]
[![MongoDB][MongoDB]][MongoDB-url]
[![JavaScript][JavaScript]][JavaScript-url]
[![Axios][Axios]][Axios-url]
[![Vue][Vue.js]][Vue-url]

## Authors
* **Jin** - *Backend and Routing*
* **Paula** - *Database and API*
* **Bryan** - *Project Design and Frontend*

<!-- MARKDOWN LINKS & IMAGES -->
[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org/
[Express.js]: https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://expressjs.com/
[MongoDB]: https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white
[MongoDB-url]: https://www.mongodb.com/
[JavaScript]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[JavaScript-url]: https://www.javascript.com/
[Axios]: https://img.shields.io/badge/Axios-671DDF?style=for-the-badge&logo=axios&logoColor=white
[Axios-url]: https://axios-http.com/docs/api_intro
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
