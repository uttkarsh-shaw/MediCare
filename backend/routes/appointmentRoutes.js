const express = require("express");

const router = express.Router();

const {

  bookAppointment,

  getDoctorAppointments,
  updateAppointmentStatus,
  getMyAppointments,
  addPrescription,
  getSingleAppointment,
  deleteAppointment,
} = require(
  "../controllers/appointmentController"
);

const {
  protect
} = require(
  "../middlewares/authMiddleware"
);


// BOOK APPOINTMENT
router.post(
  "/book",
  protect,
  bookAppointment
);


// GET DOCTOR APPOINTMENTS
router.get(
  "/doctor",
  protect,
  getDoctorAppointments
);


// GET MY APPOINTMENTS
router.get(
  "/my-appointments",
  protect,
  getMyAppointments
);


router.put(
  "/status/:id",
  protect,
  updateAppointmentStatus
);

router.put(
  "/prescription/:id",
  protect,
  addPrescription
);

router.get(
  "/:id",
  protect,
  getSingleAppointment
);

router.delete(
  "/:id",
  protect,
  deleteAppointment
);

module.exports = router;

