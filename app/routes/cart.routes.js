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

    app.post("/api/cart/add", 
        verifyToken, 
        controller.addNewCartItem);

    // app.get("/api/Cart/cart-items", 
    //     verifyToken, 
    //     controller.getListCartItems);

    // app.delete("/api/item/delete-item", 
    //     verifyToken, 
    //     controller.deleteItem);

    // app.post("/api/item/edit", 
    //     verifyToken, 
    //     controller.saveEditedItem);

}
