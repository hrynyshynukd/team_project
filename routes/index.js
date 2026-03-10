const express = require("express");
const { Op, fn, col, where } = require("sequelize");

const Log = require("../models/log.model");
const transformLogs = require("../utils/logs.transformer");
const logController = require("../controllers/log.controller");

const router = express.Router();

/* -------------------- Get logs -------------------- */

router.get("/", async function (req, res) {
  logController.getLogs(req, res);
});

/* -------------------- Create page -------------------- */

router.get("/create", function (req, res) {
  res.render("create-log", { title: "Create Log" });
});

/* -------------------- Create log -------------------- */

router.post("/create", async function (req, res) {
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
