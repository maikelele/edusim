const express = require('express');
const path = require('path');
const app = express();
const authRoutes = require('./authRoutes');

const PORT = 4012;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes)

app.get('/resources/introduction.mp4', (req, res) => {
    res.sendFile(path.join(__dirname, '../resources/introduction.mp4'));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})