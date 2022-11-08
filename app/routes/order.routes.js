const controller = require("../controllers/order.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    app.post("/api/order/create-order", 
        verifyToken, 
        controller.createOrder);

    app.get("/api/order/list-orders", 
        verifyToken, 
        controller.getListOrders);
}