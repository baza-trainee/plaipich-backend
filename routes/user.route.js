const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticate = require("../utils/authenticate");

router.post("/user", userController.checkUser);

router.get("/user", authenticate, userController.getUser);

router.patch("/user", authenticate, userController.updateUser);

router.post("/reset-password", userController.resetPassword);

module.exports = router;
