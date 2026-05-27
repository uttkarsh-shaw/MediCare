const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(

  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    specialization: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    certificate: {
      type: String,
      required: true,
    },

    consultationFee: {
      type: Number,
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    timings: {
      type: String,
      required: true,
    },

    // DOCTOR PROFILE IMAGE
    image: {

      type: String,

      default: "",

    },

    approvalStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },

  {
    timestamps: true,
  }

);

module.exports = mongoose.model(
  "Doctor",
  doctorSchema
);