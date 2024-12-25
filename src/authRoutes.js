const express = require('express');
const authRoutes = express.Router();
const {loginUser , registerUser } = require('./controllers/authController');
const { savePlot, getPlots } = require('./controllers/plotController');

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/savePlot', savePlot);
authRoutes.post('/getPlots', getPlots);

module.exports = authRoutes;