const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Cart = db.cart;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});

		const cart = new Cart({
			listCartItems: [],
			createUser: user.id,
		});

		const resultUser = await user.save();

		const resultCart = await cart.save();

		let token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			config.secret,
			{
				expiresIn: 172800, // 48 hours
			}
		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
			message: "You registered!",
		});
	} catch (error) {
		
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.login = async (req, res) => {
	try {
		const user = await User.findOne({
			email: req.body.email,
		}).exec();

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		let passwordIsValid = bcrypt.compareSync(
			req.body.password,
			user.password
		);

		if (!passwordIsValid) {
			return res.status(401).send({
				accessToken: null,
				message: "Invalid Password!",
			});
		}

		let token = jwt.sign(
			{ id: user.id, username: user.username, email: user.email },
			config.secret,
			{
				expiresIn: 172800,
			}
		);

		res.status(200).send({
			id: user._id,
			username: user.username,
			email: user.email,
			accessToken: token,
			address: user.address
		});
	} catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.sendUserEmail = async (req, res) => {
	try {
		const user = await User.findOne({ // find user by his id
			_id: req.userId,
		}).exec();

		if (!user) {
			return res.status(404).send({ message: "User not found" });
		}

		res.status(200).send({
			id: req.userId,
			username: req.username,
			email: req.email,
			address: user.address, // to get his address
		});
	} catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.saveUserAddress = async (req, res) => {
	try {
		const result = await User.updateOne(
			{
				_id: req.userId,
			},
			{
				address: req.body,
			}
		);

		if (result.modifiedCount === 1) {
			res.status(200).send({
				message: "User address was updated!",
			});
		} else {
			res.status(400).send({
				message: "Nothing was updated!",
			});
		}
	} catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};
