const express = require('express');
const {register, login, logout} = require('../controller/user.auth.controller');
const { getAllUser, deleteUser, updateRole, updateProfile, imageUplaode, oneUser } = require('../controller/user.controller');
const veryfyAdmin = require('../middleware/veryfiAdmin');



const router = express.Router();


router.post('/register' , register);
router.post('/login' , login);
router.post('/logout' , logout);


// 
router.get('/user' , getAllUser);
router.delete('/user/:id', veryfyAdmin, deleteUser);
router.put('/user/:id' , veryfyAdmin, updateRole);
router.patch('/edite-profile/:id',updateProfile);
router.get('/oneuser/:id',oneUser);





module.exports = {router};  //export the model to use it in other files