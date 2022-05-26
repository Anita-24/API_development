const mongoose = require("mongoose");
const Schema = mongoose.Schema();

const otpSchema = Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    otp: {
      type: Number,
      required: true,
    },
    isVerified: Boolean,
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

const User = mongoose.model("Otp", otpSchema);
module.exports = User;
