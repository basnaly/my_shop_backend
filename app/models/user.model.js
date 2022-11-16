const mongoose = require("mongoose");
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        email: String,
        password: String,
        address: {
            city: String,
            street: String,
            buildNumber: String,
            appartment: String,
            phone: String,
        },
    })
);

module.exports = User;