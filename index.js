require('dotenv').config();
const express = require("express");
const app = express();

const PORT = process.env.PORT;

app.get('/', (req, res) => {
    res.status(200).json({message: 'ok'})
})


app.listen(PORT, () => console.log(`running at: http://localhost:${PORT}`) )