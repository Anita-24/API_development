const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const passport = require("passport");

//GET ROUTES

router.get("/register", authController.getSignUp);
router.get("/login", authController.getSignIn);
router.get("/fetchUser", authController.fetchSingleUser);
router.get("/logout", authController.logout);

//POST ROUTES

router.post("/register", authController.SignUp);
router.post("/login", authController.SignIn);

//UPDATE ROUTES

// router.put(
//   "/update",

//   authController.updateToExtendedUser
// );

//GOOGLE AUTH ROUTES
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/users/login",
    successRedirect: "/profile",
  })
);

// FACEBOOK AUTH ROUTES
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email", "profile"] })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/users/login",
  })
);

// LINKED IN AUTH ROUTES

router.get(
  "/auth/linkedin",
  passport.authenticate("linkedin", {
    scope: ["r_emailaddress", "r_liteprofile"],
  })
);

router.get(
  "/auth/linkedin/callback",
  passport.authenticate("linkedin", {
    successRedirect: "/",
    failureRedirect: "/users/login",
  })
);
module.exports = router;
