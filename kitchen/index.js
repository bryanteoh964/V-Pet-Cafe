const express = require('express')
const cors = require('cors')
const tempRouter = require("./routes/temp")
const tempRouter2 = require("./routes/temp2")
const connectDB = require('./db')

const app = express()
const port = process.env.PORT || 3000
const dbPath = "/temp"
const spotPath = "/spot"

connectDB();

app.use(cors());

app.get('/', (req, res) => {
    res.send("<h1>Hello, World!<h1>")
})

app.use(dbPath, tempRouter)
app.use(spotPath, tempRouter2)

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})