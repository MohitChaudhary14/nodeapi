const jwt = require("jsonwebtoken")

const sendCookie = (user,res,message,statusCode=200) => {
    const token = jwt.sign({ _id: user._id}, process.env.JWT_SCR);
    console.log(token)

    res.status(statusCode).cookie("token",token,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        SameSite: process.env.NODE_EN === 'devlopnment' ? "lax":"none",
        secure: process.env.NODE_EN === "devlopnment"? false:true,
    }).json({
        success: true,
        message,
    })
    
}

module.exports = sendCookie;