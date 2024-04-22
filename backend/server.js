require('dotenv').config()
const express = require('express')

// express app
const app = express()

app.get('/', (req, res) => {
    res.json({message: "Welcome"})
})

// LISTEN FOR REQUESTS
const PORT=process.env.PORT
app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}`)
})

