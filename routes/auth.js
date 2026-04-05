const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/user.model");

const router = express.Router();

/* -------------------- LOGIN PAGE -------------------- */

router.get("/login", (req, res) => {
  const error = req.session.error;
  const success = req.session.success;

  req.session.error = null;
  req.session.success = null;

  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("login", {
    title: "Login",
    error,
    success,
  });
});

/* -------------------- REGISTER PAGE -------------------- */

router.get("/register", (req, res) => {
  const error = req.session.error;

  req.session.error = null;

  if (req.session.user) {
    return res.redirect("/dashboard");
  }

  res.render("register", {
    title: "Register",
    error,
  });
});

/* -------------------- REGISTER -------------------- */

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      req.session.error = "All fields are required";
      return res.redirect("/register");
    }

    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      req.session.error = "User already exists";
      return res.redirect("/register");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    req.session.success = "Account created successfully. Please login.";
    res.redirect("/login");
  } catch (error) {
    console.error(error);
    req.session.error = "Something went wrong";
    res.redirect("/register");
  }
});

/* -------------------- LOGIN -------------------- */

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      req.session.error = "All fields are required";
      return res.redirect("/login");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      req.session.error = "Invalid email or password";
      return res.redirect("/login");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      req.session.error = "Invalid email or password";
      return res.redirect("/login");
    }

    req.session.user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.redirect("/dashboard");
  } catch (error) {
    console.error(error);
    req.session.error = "Something went wrong";
    res.redirect("/login");
  }
});

/* -------------------- LOGOUT -------------------- */

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
});

module.exports = router;