const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/login", authController.getLoginPage);

router.get("/register", authController.getRegisterPage);

router.post("/register", authController.register);

router.post("/login", authController.login);

router.get("/logout", authController.logout);

module.exports = router;