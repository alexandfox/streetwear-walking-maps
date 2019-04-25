require("dotenv").config();

const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const app = express();
const mapModel = require("./models/map");
const flash = require("connect-flash"); //beginning

// process.env.MONGODB_URI

mongoose
  .connect("mongodb://localhost/streetwear-walking-maps", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// Routes

app.locals.title = "streetwear walking maps";

app.use(
  session({
    cookie: { maxAge: 180000 },
    secret: "our-passport-local-strategy-app",
    resave: true,
    saveUninitialized: true
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");

app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());
app.use(passport.session());

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true
  })
);

// ...other code
function checkloginStatus(req, res, next) {
  res.locals.isLoggedIn = req.isAuthenticated();
  res.locals.user = req.user;
  next();
}

const index = require("./routes/index");
app.use("/", index);

const create = require("./routes/create");
app.use("/create", create);

const authRoutes = require("./routes/auth-routes");
app.use("/", authRoutes);

module.exports = app;
