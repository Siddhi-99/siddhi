const mongoose = require("mongoose");
const Event = require("../models/Event");

// Create a new event
const createEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      venue,
      club,
      maxParticipants,
      image,
    } = req.body;

    const event = new Event({
      title,
      description,
      date,
      time,
      venue,
      club,
      maxParticipants: maxParticipants || 50,
      image: image || null,
      isActive: true,
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      event: {
        id: event._id,
        title: event.title,
        description: event.description,
        date: event.date,
        time: event.time,
        venue: event.venue,
        club: event.club,
        maxParticipants: event.maxParticipants,
        attendees: event.attendees,
        image: event.image,
        createdAt: event.createdAt,
      },
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all events (admin view)
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({})
      .select("-__v")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      events,
    });
  } catch (error) {
    console.error("Get events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get public events
const getPublicEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true })
      .select("-__v")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Events retrieved successfully",
      events,
    });
  } catch (error) {
    console.error("Get public events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get event by ID
const getEventById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Event ID" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event retrieved successfully",
      event,
    });
  } catch (error) {
    console.error("Get event by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update event
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Event ID" });
    }

    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const event = await Event.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event,
    });
  } catch (error) {
    console.error("Update event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete event (soft delete)
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Event ID" });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    console.error("Delete event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Register for event
const registerForEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { userEmail } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: "Invalid Event ID" });
    }

    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ success: false, message: "Event not found" });
    }

    if (event.attendees.includes(userEmail)) {
      return res.status(400).json({
        success: false,
        message: "User already registered for this event",
      });
    }

    if (event.attendees.length >= event.maxParticipants) {
      return res.status(400).json({
        success: false,
        message: "Event is full",
      });
    }

    event.attendees.push(userEmail);
    await event.save();

    res.status(200).json({
      success: true,
      message: "Successfully registered for event",
      event,
    });
  } catch (error) {
    console.error("Register for event error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Search events
const searchEvents = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const events = await Event.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { title: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { club: { $regex: query, $options: "i" } },
            { venue: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("-__v")
      .sort({ date: 1 });

    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      events,
    });
  } catch (error) {
    console.error("Search events error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getPublicEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  registerForEvent,
  searchEvents,
};
