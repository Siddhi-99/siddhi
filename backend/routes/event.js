const express = require("express");
const {
  createEvent,
  getAllEvents,
  getPublicEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  searchEvents,
} = require("../controllers/eventController");
const { auth, adminAuth } = require("../middleware/auth");

const router = express.Router();

// Public routes (no authentication required)
router.get("/search", searchEvents); // Search events
router.get("/public", getPublicEvents); // Get public events (active only)
router.get("/:id", getEventById); // Get event by ID
router.post("/:id/register", registerForEvent); // Register for event

// Protected routes (require authentication)
router.get("/", auth, adminAuth, getAllEvents); // Get all events (admin only - includes inactive)
router.post("/add-event", auth, adminAuth, createEvent); // Create new event (admin only)
router.put("/:id", auth, adminAuth, updateEvent); // Update event (admin only)
router.delete("/:id", auth, adminAuth, deleteEvent); // Delete event (admin only)

module.exports = router;
