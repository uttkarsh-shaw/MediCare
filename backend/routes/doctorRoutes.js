const upload = require("../middlewares/uploadMiddleware");
const express = require("express");

const router = express.Router();


const {
  createDoctorProfile,
  getApprovedDoctors,
  getDoctorProfile,
  getPendingDoctors,
  getAllDoctors,
  approveDoctor,
  rejectDoctor,
  updateDoctorProfile,
} = require(
  "../controllers/doctorController"
);


const {
  protect
} = require(
  "../middlewares/authMiddleware"
);



// ==========================================
// CREATE DOCTOR PROFILE
// ==========================================
router.post(
  "/create-profile",
  protect,
  upload.single("image"),
  createDoctorProfile
);

// ==========================================
// GET APPROVED DOCTORS
// PUBLIC DOCTORS PAGE
// ==========================================
router.get(
  "/",
  getApprovedDoctors
);



// ==========================================
// GET MY PROFILE
// DOCTOR DASHBOARD
// ==========================================
router.get(
  "/my-profile",
  protect,
  getDoctorProfile
);



// ==========================================
// GET PENDING DOCTORS
// ADMIN
// ==========================================
router.get(
  "/pending",
  getPendingDoctors

);

// ==========================================
// GET ALL DOCTORS
// ADMIN DASHBOARD
// ==========================================
router.get(
  "/all",
  getAllDoctors

);

// ==========================================
// APPROVE DOCTOR
// ==========================================
router.put(
  "/approve/:id",
  approveDoctor

);

// ==========================================
// REJECT DOCTOR
// ==========================================
router.put(
  "/reject/:id",
  rejectDoctor
);

router.put(
  "/update-profile",
  protect,
  upload.single("image"),
  updateDoctorProfile

);

module.exports = router;