const mongoose = require('mongoose');

const connectdb = () => {
    mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        console.log("database is connected ");
    })
    .catch((err) => {
        console.log("err", err);
    });

}

module.exports = connectdb