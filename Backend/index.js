const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')

connectToMongo();
const port = 4000

// Midleware to send data in body
const app = express()
app.use(express.json())
app.use(cors())

// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`Example app listening on port at http://localhost:${port}`)
})