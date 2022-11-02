const controller = require("../controllers/basket.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    app.post("/api/basket/add", 
        verifyToken, 
        controller.addNewBasketItem);

    app.get("/api/basket/basket-items", 
        verifyToken, 
        controller.getListBasketItems);

    // app.delete("/api/item/delete-item", 
    //     verifyToken, 
    //     controller.deleteItem);

    // app.post("/api/item/edit", 
    //     verifyToken, 
    //     controller.saveEditedItem);

}
