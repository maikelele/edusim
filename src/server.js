const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');

const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes)


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})