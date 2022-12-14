const mongoose = require("mongoose");

const Cart = mongoose.model(
	"Cart",
	new mongoose.Schema({
		createUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		listCartItems: [
			{
				itemName: String,
				image: String,
				price: Number,
				unit: String,
				note: String,
				quantity: Number,
				total: Number,
			},
		],
	})
);

module.exports = Cart;
