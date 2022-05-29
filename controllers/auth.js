const bcrypt = require("bcrypt");
const User = require("../models/user");
const JWT = require("jsonwebtoken");
const { sendTextMessage } = require("../config/message");
const { SendEmail } = require("../config/email");

exports.getSignUp = async (req, res) => {
  return res.redirect("/SignUp");
};

exports.getSignIn = async (req, res) => {
  return res.redirect("/SignIn");
};

exports.SignUp = async (req, res) => {
  try {
    const email = req.body.email;
    const name = req.body.name;
    const phone = req.body.phone;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const dateOfJoining = req.body.dateOfJoining;
    if (password !== confirmPassword) {
      return res.status(404).json({
        message: "password doesn't match",
      });
    }
    const fetchedUser = await User.findOne({ email: email });
    const hashedPassword = await bcrypt.hash(password, 10);
    if (!fetchedUser) {
      let newUser = await new User({
        name: name,
        email: email,
        password: hashedPassword,
        phone: phone,
        dateOfJoining: dateOfJoining,
      });
      newUser.save();

      if (email && phone) {
        SendEmail(email);
      } else if (phone && !email) {
        sendTextMessage();
      } else {
        SendEmail(email);
      }
      return res.status(202).json({
        message: "User created successfully",
        data: newUser,
      });
    } else {
      return res.status(200).json({
        message: "User already exists . Please try another username",
        data: fetchedUser,
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: error,
    });
  }
};

exports.SignIn = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(422).json({
        message: "User Doesn't exists",
      });
    } else {
      const matchPassword = await bcrypt.compare(password, user.password);
      // const matchPassword = user.email === email;
      console.log(matchPassword);
      if (!matchPassword) {
        return res.status(404).json({
          message: "Invalid username or password",
        });
      } else {
        const token = JWT.sign(user.toJSON(), process.env.JWT_SECRET);
        user.token = token;
        return res.status(200).json({
          message: "Sign In Successfully , here is your token ",
          token: token,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.logout = async (req, res) => {
  req.logout();
  return res.status(200).json({
    message: "Logged Out Successfully!!",
  });
};

exports.updateToExtendedUser = async (req, res) => {};

exports.fetchSingleUser = async (req, res) => {
  const email = req.query.email;
  try {
    const user = await User.find({ email: email });
    if (!user) {
      return res.status(422).json({
        message: "User with this email id doesn't found",
      });
    }
    return res.status(200).json({
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
