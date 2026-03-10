const { Op, fn, col, where } = require("sequelize");
const Log = require("../models/log.model");
const transformLogs = require("../utils/logs.transformer");

exports.getLogs = async (req, res) => {
  try {
    let whereClause = {};

    /* -------------------- Device filter -------------------- */

    if (req.query.deviceId) {
      whereClause[Op.and] = whereClause[Op.and] || [];

      whereClause[Op.and].push(
        where(fn("LOWER", col("deviceId")), {
          [Op.like]: `%${req.query.deviceId.toLowerCase()}%`,
        })
      );
    }

    /* -------------------- Category filter -------------------- */

    if (req.query.category) {
      whereClause[Op.and] = whereClause[Op.and] || [];

      whereClause[Op.and].push(
        where(fn("LOWER", col("category")), {
          [Op.like]: `%${req.query.category.toLowerCase()}%`,
        })
      );
    }

    /* -------------------- Description filter -------------------- */

    if (req.query.description) {
      whereClause[Op.and] = whereClause[Op.and] || [];

      whereClause[Op.and].push(
        where(fn("LOWER", col("description")), {
          [Op.like]: `%${req.query.description.toLowerCase()}%`,
        })
      );
    }

    /* -------------------- Date filter -------------------- */

    if (req.query.fromDateTime || req.query.toDateTime) {
      whereClause.date = {};

      if (req.query.fromDateTime) {
        whereClause.date[Op.gte] = new Date(req.query.fromDateTime);
      }

      if (req.query.toDateTime) {
        whereClause.date[Op.lte] = new Date(req.query.toDateTime);
      }
    }

    /* -------------------- Sorting -------------------- */

    let orderClause;

    if (req.query.sortBy && req.query.sortOrder) {
      orderClause = [
        [req.query.sortBy, req.query.sortOrder.toUpperCase()],
      ];
    }

    /* -------------------- Query database -------------------- */

    const logs = await Log.findAll({
      where: whereClause,
      order: orderClause,
    });

    /* -------------------- Render page -------------------- */

    res.render("index", {
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

    res.render("index", {
      title: "Logs",
      logs: [],
      error: error.message,
    });
  }
};
