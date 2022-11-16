const { verifyRegister: verifyRegister } = require("../middlewares");
const controller = require("../controllers/user.controller");
const { verifyToken } = require("../middlewares/authJwt");
const { validateOldPassword } = require("../middlewares/verifyPassword");
const userController = require("../controllers/user.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/user/register",
        [
            verifyRegister.validatePassword,
            verifyRegister.checkDuplicateEmail,
            
        ],
        controller.register
    );

    app.post("/api/user/login", controller.login)

    app.get("/api/user/check-user", 
    verifyToken, 
    controller.sendUserEmail);

    app.post("/api/user/save-address",
    verifyToken,
    controller.saveUserAddress)
}