const express = require("express");
const connectdb = require('./data/database')
const User = require('./model/user');
const router = require("./routes/user");
const task = require("./routes/task")
const cookieParser = require("cookie-parser");
const { errorMiddleware} = require("./middleware/error");
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 3000
const app = express();

// midlleware
app.use(express.json());
app.use(cookieParser());
connectdb();


app.use('/api/v1/users', router)
app.use('/api/v1/task', task)


app.get("/", (req, res) => {
    res.send("<h1>hello</h1>");
});

app.use(errorMiddleware)

app.listen(PORT, (req, res) => {
    console.log(`server is connected ${PORT} `);
});

