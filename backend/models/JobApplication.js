const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema(
    {
        user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},

        company: {
            type: String,
            required: true,
            trim: true
        },

        jobTitle: {
            type: String,
            required: true,
            trim: true
        },

        jobType: {
            type: String,
            enum: ["Internship", "Full-Time", "Part-Time", "Contract"],
            required: true
        },

        location: {
            type: String,
            trim: true
        },

        applicationDate: {
            type: Date,
            default: Date.now
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Interview",
                "Assessment",
                "Offer",
                "Rejected",
                "Withdrawn"
            ],
            default: "Applied"
        },

        jobUrl: {
            type: String,
            trim: true
        },

        notes: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("JobApplication", jobApplicationSchema);