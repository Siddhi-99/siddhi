const Club = require("../models/Club");

// Create a new club
const createClub = async (req, res) => {
  try {
    const {
      name,
      description,
      objectives,
      teacher,
      teacherPhoto,
      headStudent,
      headPhoto,
      coHead,
      coHeadPhoto,
      achievements,
      clubPhotos,
    } = req.body;

    // Check if club with same name already exists
    const existingClub = await Club.findOne({ name });
    if (existingClub) {
      return res.status(400).json({
        success: false,
        message: "Club with this name already exists",
      });
    }

    // Create new club
    const club = new Club({
      name,
      description,
      objectives,
      teacher,
      teacherPhoto: teacherPhoto || null,
      headStudent,
      headPhoto: headPhoto || null,
      coHead,
      coHeadPhoto: coHeadPhoto || null,
      achievements: achievements || "",
      clubPhotos: clubPhotos || [],
    });

    await club.save();

    res.status(201).json({
      success: true,
      message: "Club created successfully",
      club: {
        id: club._id,
        name: club.name,
        description: club.description,
        objectives: club.objectives,
        teacher: club.teacher,
        teacherPhoto: club.teacherPhoto,
        headStudent: club.headStudent,
        headPhoto: club.headPhoto,
        coHead: club.coHead,
        coHeadPhoto: club.coHeadPhoto,
        achievements: club.achievements,
        clubPhotos: club.clubPhotos,
        createdAt: club.createdAt,
      },
    });
  } catch (error) {
    console.error("Create club error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get all clubs
const getAllClubs = async (req, res) => {
  try {
    const clubs = await Club.find({ isActive: true })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Clubs retrieved successfully",
      clubs,
    });
  } catch (error) {
    console.error("Get clubs error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get club by ID
const getClubById = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findById(id);
    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club retrieved successfully",
      club,
    });
  } catch (error) {
    console.error("Get club by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Update club
const updateClub = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove undefined values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const club = await Club.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club updated successfully",
      club,
    });
  } catch (error) {
    console.error("Update club error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Delete club (soft delete)
const deleteClub = async (req, res) => {
  try {
    const { id } = req.params;

    const club = await Club.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: Date.now() },
      { new: true }
    );

    if (!club) {
      return res.status(404).json({
        success: false,
        message: "Club not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Club deleted successfully",
    });
  } catch (error) {
    console.error("Delete club error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Search clubs by name
const searchClubs = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const clubs = await Club.find({
      $and: [
        { isActive: true },
        {
          $or: [
            { name: { $regex: query, $options: "i" } },
            { description: { $regex: query, $options: "i" } },
            { teacher: { $regex: query, $options: "i" } },
          ],
        },
      ],
    })
      .select("-__v")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Search results retrieved successfully",
      clubs,
    });
  } catch (error) {
    console.error("Search clubs error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createClub,
  getAllClubs,
  getClubById,
  updateClub,
  deleteClub,
  searchClubs,
};
