//Route for auth Users
const express = require('express');
const router = express.Router();
const userMiddleware = require('../middleware/user.js');

const {signUpClient,LoginClient,LogOut,GetModule} = require('../controller/authentication/auth.controller')

const verifyToken = require('../security/verifyToken');
//client
router.post('/client/login',LoginClient);
router.post('/client/signUp', signUpClient);


router.get('/GetModule',verifyToken,GetModule);


// destroy token in server
router.post('/Logout',LogOut);


module.exports = router;