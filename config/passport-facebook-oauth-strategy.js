const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/user");

try {
  passport.use(
    new FacebookStrategy(
      {
        // pull in our app id and secret from our auth.js file
        clientID: process.env.CLIENT_ID_FACEBOOK,
        clientSecret: process.env.CLEINT_SECRET_FACEBOOK,
        callbackURL: process.env.CALLBACK_URL_FACEBOOK,
      }, // facebook will send back the token and profile
      function (accessToken, refreshToken, profile, done) {
        User.findOne({ email: profile.emails[0].value }).exec(function (
          err,
          user
        ) {
          // if there is an error, stop everything and return that
          // i.e an error connecting to the database
          if (err) {
            console.log(
              "error in finding user in facebook strategy passport",
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
                password: crypto.randomBytes(12).toString("hex"),
                pic: profile.photos[0].value,
                token: accessToken,
              },
              function (error, user) {
                if (error) {
                  console.log("error in creating user google strategy", error);
                  return;
                }
                console.log("uuuuuuuuuuuuuuuuuuuuu", user);
                return done(null, user);
              }
            );
          }
        });
      }
    )
  );
} catch (error) {
  console.log("error", error);
}

// used to serial or put it into the cookie - the current logged in user
passport.serializeUser(function (user, done) {
  done(null, user);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = passport;
