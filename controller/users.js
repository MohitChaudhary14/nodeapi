const User = require('../model/user')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const sendCookie = require("../utilis/feature");
const { ErrorHandler } = require('../middleware/error');

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select("+password");
    
    
        if (!user) return next(new ErrorHandler("invalid email", 404))
    
    
        const isMatch = await bcrypt.compare(password, user.password)
    
    
    
        if (!isMatch) return next(new ErrorHandler('invalid Password', 404))
    
        sendCookie(user, res, `welcome ${user.name}`, 201)
    } catch (error) {
        next(error)
    }
   
};

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body

    let user = await User.findOne({ email })


    if(user) return next(new ErrorHandler('user is Already Exist',404))

    const hashed = await bcrypt.hash(password, 10)

    user = await User.create({
        name,
        email,
        password: hashed
    })

    sendCookie(user, res, "Register Succesfuly", 201)
    } catch (error) {
        next(error)
    }
    

}

const getMyProfile = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "login successfully",
        user: req.user
    })
}


const logout = (req, res, next) => {
    res.status(201).cookie("token", "", { 
        expire: new Date(Date.now()),
        SameSite: process.env.NODE_EN === 'devlopnment' ? "lax":"none",
        secure: process.env.NODE_EN === "devlopnment"? false:true, 
    })
        .json({
            success: true,
            user: req.user
        })

}




module.exports = { login, register, getMyProfile, logout }