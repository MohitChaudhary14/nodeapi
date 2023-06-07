const express = require('express')
const {register,getMyProfile,login,logout} = require('../controller/users')
const isAuthenticated = require("../middleware/auth")

const router = express.Router()

router.post('/new',register); // register

router.post('/login',login); // login

router.get('/logout',logout); // logout

router.get("/me", isAuthenticated, getMyProfile) // acess all data 




module.exports = router
