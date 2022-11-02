const controller = require("../controllers/item.controller");
const { verifyToken } = require("../middlewares/authJwt");

module.exports = function (app) {
	app.use(function (req, res, next) {
		res.header(
			"Access-Control-Allow-Headers",
			"x-access-token, Origin, Content-Type, Accept"
		);
		next();
	});

    app.post("/api/item/create", 
        verifyToken, 
        controller.createNewItem);

    app.get("/api/item/list-items", 
        // verifyToken, 
        controller.getListItems);

    app.delete("/api/item/delete-item", 
        verifyToken, 
        controller.deleteItem);

    app.post("/api/item/edit", 
        verifyToken, 
        controller.saveEditedItem);

}
