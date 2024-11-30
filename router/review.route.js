
const express = require('express');
const {reviewPost, allreviewPost} = require('../controller/review.controller');


const reviewRoutes =  express.Router();

// Add routes
reviewRoutes.post('/review', reviewPost);
reviewRoutes.get('/all',allreviewPost );


module.exports = {reviewRoutes};
