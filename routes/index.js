const express = require("express");
const authMiddleware = require("../middleware/auth");

const Log = require("../models/log.model");
const transformLogs = require("../utils/logs.transformer");
const { Op, fn, col, where } = require("sequelize");

const router = express.Router();

/* -------------------- HOME -------------------- */

router.get("/home", (req, res) => {
  res.render("home", {
    title: "Home",
    user: req.session.user || null,
  });
});

/* -------------------- DASHBOARD -------------------- */

router.get("/dashboard", authMiddleware, async function (req, res) {
  try {
    let whereClause = {};

    if (req.query.deviceId) {
      whereClause[Op.and] = whereClause[Op.and] || [];
      whereClause[Op.and].push(
        where(fn("LOWER", col("deviceId")), {
          [Op.like]: `%${req.query.deviceId.toLowerCase()}%`,
        })
      );
    }

    if (req.query.category) {
      whereClause[Op.and] = whereClause[Op.and] || [];
      whereClause[Op.and].push(
        where(fn("LOWER", col("category")), {
          [Op.like]: `%${req.query.category.toLowerCase()}%`,
        })
      );
    }

    if (req.query.description) {
      whereClause[Op.and] = whereClause[Op.and] || [];
      whereClause[Op.and].push(
        where(fn("LOWER", col("description")), {
          [Op.like]: `%${req.query.description.toLowerCase()}%`,
        })
      );
    }

    if (req.query.fromDateTime || req.query.toDateTime) {
      whereClause.date = {};

      if (req.query.fromDateTime) {
        whereClause.date[Op.gte] = new Date(req.query.fromDateTime);
      }

      if (req.query.toDateTime) {
        whereClause.date[Op.lte] = new Date(req.query.toDateTime);
      }
    }

    let orderClause;
    if (req.query.sortBy && req.query.sortOrder) {
      orderClause = [[req.query.sortBy, req.query.sortOrder.toUpperCase()]];
    }

    const logs = await Log.findAll({
      where: whereClause,
      order: orderClause,
    });

    res.render("dashboard", {
      title: "Logs",
      logs: transformLogs(logs),
      selectedFrom: req.query.fromDateTime || "",
      selectedTo: req.query.toDateTime || "",
      selectedDeviceId: req.query.deviceId || "",
      selectedCategory: req.query.category || "",
      selectedDescription: req.query.description || "",
      selectedSort: req.query.sortBy || "",
      selectedOrder: req.query.sortOrder || "",
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    res.render("dashboard", {
      title: "Logs",
      logs: [],
      error: error.message,
    });
  }
});

/* -------------------- CREATE -------------------- */

router.get("/create", authMiddleware, (req, res) => {
  res.render("create-log", { title: "Create Log" });
});

router.post("/create", authMiddleware, async function (req, res) {
  const { date, deviceId, category, description } = req.body;

  try {
    await Log.create({ date, deviceId, category, description });
    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    res.render("create-log", {
      title: "Create Log",
      error: error.message,
    });
  }
});

module.exports = router;