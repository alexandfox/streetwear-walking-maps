// routes/auth-routes.js

const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const express = require("express");
const authRoutes = express.Router();
const ensureLogin = require("connect-ensure-login");
// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

passport.use(
  new LocalStrategy((username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
      }

      return next(null, user);
    });
  })
);

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login");
});
var login = false;
authRoutes.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    // failureFlash: true,
    // passReqToCallBack: truex,
    login: true
  })
);

authRoutes.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs");
});

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const originalPassword = req.body.password;

  if (username === "" || originalPassword === "") {
    res.render("auth/signup", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }).then(user => {
    if (user === username) {
      res.render("/signup", { message: "The username already exists" });
      return;
    }
  });

  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(originalPassword, salt);

  User.create({ username, password: hashPass })
    .then(userData => {
      console.log(userData);
      res.redirect("/login");
    })
    .catch(err => console.log(err));
});

authRoutes.get("/login", (req, res, next) => {
  res.render("auth/login.hbs");
});

module.exports = authRoutes;
