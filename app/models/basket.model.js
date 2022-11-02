const mongoose = require("mongoose");

const Basket = mongoose.model(
    'Basket',
    new mongoose.Schema({
        createUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        itemName: String,
        image: String,
        price: Number,
        unit: String,
        note: String,
        quantity: Number,
        total: Number,
    })
)

module.exports = Basket;