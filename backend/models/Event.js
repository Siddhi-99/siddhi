const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Event title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Event description is required"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "Event date is required"],
  },
  time: {
    type: String,
    required: [true, "Event time is required"],
    trim: true,
  },
  venue: {
    type: String,
    required: [true, "Event venue is required"],
    trim: true,
  },
  club: {
    type: String,
    required: [true, "Club name is required"],
    trim: true,
  },
  maxParticipants: {
    type: Number,
    default: 50,
  },
  attendees: {
    type: [String], // Array of user emails who registered
    default: [],
  },
  image: {
    type: String, // Event image URL or base64
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update updatedAt field before saving
eventSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Event", eventSchema);
