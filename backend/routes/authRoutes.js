const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  registerUser,
  loginUser,
  getUserProfile,
  adminLogin
} = require("../controllers/authController");


// REGISTER ROUTE
router.post("/register", registerUser);

// LOGIN ROUTE
router.post("/login", loginUser);

// GET USER PROFILE ROUTE
router.get("/profile", protect, getUserProfile);
router.post("/admin-login",adminLogin);

module.exports = router;