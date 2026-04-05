const mongoose = require("mongoose");

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Club name is required"],
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: [true, "Club description is required"],
        trim: true,
    },
    objectives: {
        type: String,
        required: [true, "Club objectives are required"],
        trim: true,
    },
    teacher: {
        type: String,
        required: [true, "Teacher name is required"],
        trim: true,
    },
    teacherPhoto: {
        type: String, // Store image URL or base64
        default: null,
    },
    headStudent: {
        type: String,
        required: [true, "Head student name is required"],
        trim: true,
    },
    headPhoto: {
        type: String, // Store image URL or base64
        default: null,
    },
    coHead: {
        type: String,
        required: [true, "Co-head name is required"],
        trim: true,
    },
    coHeadPhoto: {
        type: String, // Store image URL or base64
        default: null,
    },
    achievements: {
        type: String,
        default: "",
        trim: true,
    },
    clubPhotos: [{
        type: String, // Array of image URLs or base64
    }],
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


clubSchema.pre("save", function (next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Club", clubSchema);
