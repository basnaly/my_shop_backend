const controller = require("../controllers/cart.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    app.post("/api/cart/update", 
        verifyToken, 
        controller.updateCart);

    app.get("/api/cart/cart-list", 
        verifyToken, 
        controller.getCartList);

}
