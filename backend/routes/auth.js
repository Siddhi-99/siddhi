const express = require("express");
const {
  userSignup,
  userLogin,
  adminSignup,
  adminLogin,
  getProfile,
} = require("../controllers/authController");
const { auth } = require("../middleware/auth");

const router = express.Router();

// User routes
router.post("/signup", userSignup);
router.post("/login", userLogin);

// Admin routes
router.post("/admin/signup", adminSignup);
router.post("/admin/login", adminLogin);

// Protected routes
router.get("/profile", auth, getProfile);

module.exports = router;
