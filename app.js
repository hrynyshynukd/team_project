const session = require("express-session");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

require("dotenv").config();

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");

const sequelize = require("./db/db");
const Log = require("./models/log.model");
const seedDatabase = require("./db/seed");

const app = express();


hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 === arg2 ? options.fn(this) : options.inverse(this);
});


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");


app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "my-secret-key",
    resave: false,
    saveUninitialized: false,
  })
);


app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


app.get("/", (req, res) => {
  res.redirect("/home");
});


app.use("/", authRouter);
app.use("/", indexRouter);


app.use(function (req, res, next) {
  next(createError(404));
});


app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});


sequelize
  .sync({ force: false })
  .then(async () => {
    console.log("Database synchronized");
    await seedDatabase(Log);
  })
  .catch((error) => {
    console.error("Database sync error:", error);
  });

module.exports = app;