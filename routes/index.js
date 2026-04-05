const express = require("express");
const authMiddleware = require("../middleware/auth");
const logController = require("../controllers/log.controller");

const router = express.Router();

router.get("/home", logController.getHomePage);

router.get("/dashboard", authMiddleware, logController.getLogs);

router.get("/create", authMiddleware, logController.getCreatePage);
router.post("/create", authMiddleware, logController.createLog);

module.exports = router;