const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const passportJWT = require("./config/passport-jwt");
const googleStrategy = require("./config/passport-google-oauth-strategy");
const FacebookStrategy = require("./config/passport-facebook-oauth-strategy");
const LinkedInStrategy = require("./config/passport-linkedIn-oauth-startegy");
const passport = require("passport");
const dotenv = require("dotenv").config();
const ejs = require("ejs");
const session = require("express-session");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static("uploads"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  return res.render("sign-in");
});
app.get("/profile", isLoggedIn, (req, res) => {
  return res.render("home");
});

app.use("/users", authRoutes);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log(
      "CONNECTED TO DATABASE_____________________________________________________________________"
    );
    app.listen(3000);
  })
  .catch((err) => console.log(err));
