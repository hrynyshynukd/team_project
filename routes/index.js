const express = require("express");
const authMiddleware = require("../middleware/auth");

const Log = require("../models/log.model");
const logController = require("../controllers/dashboard/log.controller");

const router = express.Router();


router.get("/", authMiddleware, (req, res) => {
  res.render("index", { title: "" });
});


router.get("/create", authMiddleware, (req, res) => {
  res.render("create-log", { title: "Create Log" });
});


router.post("/create", authMiddleware, async (req, res) => {
  const { date, deviceId, category, description } = req.body;

  try {
    await Log.create({ date, deviceId, category, description });

    res.redirect("/");
  } catch (error) {
    console.error(error);

    res.render("create-log", {
      title: "Create Log",
      error: error.message,
    });
  }
});

module.exports = router;