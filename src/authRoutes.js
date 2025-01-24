const express = require('express');
const authRoutes = express.Router();
const {loginUser , registerUser } = require('./controllers/authController');
const { savePlot, getPlots } = require('./controllers/plotController');
const { saveSorting, getSorting } = require('./controllers/sortingController');
const { savePhysics, getPhysics } = require('./controllers/physicsController');

authRoutes.post('/login', loginUser);
authRoutes.post('/register', registerUser);
authRoutes.post('/savePlot', savePlot);
authRoutes.post('/getPlots', getPlots);
authRoutes.post('/saveSorting', saveSorting);
authRoutes.post('/getSorting', getSorting);
authRoutes.post('/savePhysics', savePhysics);
authRoutes.post('/getPhysics', getPhysics);

module.exports = authRoutes;