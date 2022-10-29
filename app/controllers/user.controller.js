const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;

let jwt = require("jsonwebtoken");
let bcrypt = require("bcryptjs");

exports.register = async (req, res) => {

	try {
		const user = new User({
			username: req.body.username,
			email: req.body.email,
			password: bcrypt.hashSync(req.body.password, 8),
		});

        const result = await user.save();

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
		console.log(error)
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.login = async (req, res) => {

	try {
		const user = await User.findOne({
			email: req.body.email,
		}).exec();

		console.log(user)

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
		});

	} catch (error) {
		res.status(500).send({ message: "Something went wrong" });
	}
};

exports.sendUserEmail = (req, res) => {
	res.status(200).send({
		id: req.userId,
		username: req.username,
		email: req.email,
	});
};