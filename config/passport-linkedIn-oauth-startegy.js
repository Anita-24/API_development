const passport = require("passport");
const dotenv = require("dotenv").config();
const LinkedInStrategy = require("passport-linkedin-oauth2").Strategy;
const User = require("../models/user");

passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.CLIENT_ID_LINKEDIN,
      clientSecret: process.env.CLIENT_SECRET_LINKEDIN,
      callbackURL: process.env.CALLBACK_URL_LINKEDIN,
      scope: ["r_emailaddress", "r_liteprofile"],
      state: true,
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile.emails[0].value }).exec(function (
        err,
        user
      ) {
        if (err) {
          console.log(
            "error in finding user in linkedin strategy passport",
            err
          );
          return;
        }
        console.log("PROFILE OF THE USER", profile);
        console.log("ACCESSS Token", accessToken);
        if (user) {
          // If user is found , set this user as req.user
          console.log("user", user);
          return done(null, user);
        } else {
          //If not found, create new user
          User.create(
            {
              name: profile.name.givenName,
              email: profile.emails[0].value,
              pic: profile.photos[0].value,
              token: accessToken,
            },
            function (error, user) {
              if (error) {
                console.log("error in creating user linkedin strategy", error);
                return;
              }
              console.log("user", user);
              return done(null, user);
            }
          );
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
