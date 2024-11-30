const express = require('express');
const {favouriteCart,favouriteCartGetById, favouriteCartDelete} = require('../controller/favourite.controller');
const veryfiUser = require('../middleware/veryfiUser');

const favouriteRouter =  express.Router();


favouriteRouter.post('/favouriteCart',favouriteCart)
favouriteRouter.get('/favouriteCartGet/:id', favouriteCartGetById)
favouriteRouter.delete('/deletefavouriteCart/:id', favouriteCartDelete)

module.exports = {favouriteRouter}