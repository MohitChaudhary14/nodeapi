const express = require('express')
const isAuthenticated = require("../middleware/auth")
const { newtitle, getMyTitle, updateTitle, deleteTitle } = require('../controller/task')



const router = express.Router()

console.log('3')

router.post("/new", isAuthenticated, newtitle)

router.get("/my", isAuthenticated, getMyTitle)

router
    .route("/:id")
    .put(isAuthenticated, updateTitle)
    .delete(isAuthenticated, deleteTitle)


module.exports = router