const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const passportJWT = require("./config/passport-jwt");
const googleStrategy = require("./config/passport-google-oauth-strategy");
const FacebookStrategy = require("./config/passport-facebook-oauth-strategy");
const passport = require("passport");
const dotenv = require("dotenv");
const ejs = require("ejs");
const session = require("express-session");

function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.use(
  session({ secret: "something", resave: false, saveUninitialized: true })
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
  .connect("mongodb://localhost/callingApp", {
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
