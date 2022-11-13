const mongoose = require("mongoose");

const Item = mongoose.model(
    'Item',
    new mongoose.Schema({
        createUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        category: String,
        outOfStock: Boolean,
        itemName: String,
        image: String,
        price: Number,
        unit: String,
        note: String,
    })
)

module.exports = Item;