const express = require("express");
const {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
  searchClubs,
} = require("../controllers/clubController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Public routes (no authentication required)
router.get("/", getAllClubs); // Get all clubs
router.get("/search", searchClubs); // Search clubs
router.get("/:id", getClubById); // Get club by ID

// Protected routes (require authentication)
router.post("/add-club", auth, adminAuth, createClub); // Create new club (admin only)
router.put("/:id", auth, adminAuth, updateClub); // Update club (admin only)
router.delete("/:id", auth, adminAuth, deleteClub); // Delete club (admin only)

module.exports = router;
