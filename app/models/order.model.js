const mongoose = require("mongoose");

const Order = mongoose.model(
	"Order",
	new mongoose.Schema({
		createUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		date: Date,
		totalQuantity: Number,
		totalSum: Number,
		items: [
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

module.exports = Order;
