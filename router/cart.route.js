const express = require('express');
const { cartProductPost, allCart, cartDelete, getCheckOut } = require('../controller/cart.controller');
const {allPayments,singleUserPayment} = require('../controller/payment.controller');
const veryfyUser = require('../middleware/veryfiUser');
const router =  express.Router();


router.post('/cartPost' ,cartProductPost)
router.get('/carts/:id', allCart)
router.delete('/cartDelete/:id',cartDelete)
router.post('/checkout-session/:id',getCheckOut)


// [payment router]
router.get('/payment/:id',singleUserPayment)
router.get('/payments',allPayments)



module.exports = router