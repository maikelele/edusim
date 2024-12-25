const express = require('express');
const authRoutes = express.Router();
const {loginUser , registerUser } = require('./controllers/authController');
const { savePlot } = require('./controllers/plotController');

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/savePlot', savePlot);

module.exports = authRoutes;