const express = require('express')
const cors = require('cors')
const catRouter = require("./routes/catstat")
const spotRouter = require("./routes/spot")
const catTalkRouter = require("./routes/cattalk")
const connectDB = require('./db')

const app = express()

const port = process.env.PORT || 3000

const dbPath = "/catstat"
const spotPath = "/spot"
const catPath = "/cat"

connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Hello, World!<h1>")
})

app.use(dbPath, catRouter)
app.use(spotPath, spotRouter)
app.use(catPath, catTalkRouter)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})