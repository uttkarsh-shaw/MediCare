const mongoose = require("mongoose");
const appointmentSchema = new mongoose.Schema(
  {
    // PATIENT
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // DOCTOR
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },

    // DATE
    appointmentDate: {
      type: String,
      required: true,
    },

    // TIME
    appointmentTime: {
      type: String,
      required: true,
    },

    // STATUS
    status: {
      type: String,
      enum: [
        "pending",
        "approved",
        "completed",
        "cancelled",
      ],
      default: "pending",
    },


    // MEDICINES
    medicines: [
      {
        type: String,
      },
    ],

    // ADVICE
    advice: {
      type: String,
      default: "",
    },

    // TESTS
    tests: {
      type: String,
      default: "",
    },
    paymentStatus: {
  type: String,
  enum: ["pending", "paid"],
  default: "pending",
  },

  paymentId: {
    type: String,
  },


  },

  {
    timestamps: true,
  }

);

module.exports =
mongoose.model(
  "Appointment",
  appointmentSchema
);