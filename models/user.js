const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    name: {
      type: "String",
    },
    email: {
      type: "String",
    },
    password: {
      type: "String",
      required: true,
    },
    phone: {
      type: "String",
    },
    dateOfJoining: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
    },
    about: {
      type: "String",
    },
    website: {
      type: "String",
    },
    price: {
      type: "String",
    },
    avatar: {},
    token: String,
    tokenExpiration: Date,
    category: {
      type: "String",
      required: true,
      enum: ["gst", "music", "fashion"],
      default: "gst",
    },
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
