const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {}; //create object for db

db.mongoose = mongoose;

db.user = require("./user.model");
db.item = require("./item.model");
db.basket = require("./basket.model")

module.exports = db;