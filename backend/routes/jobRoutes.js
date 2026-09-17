const express = require("express");
const protect = require("../middleware/authMiddleware");
const {
    createJobApplication,
    getJobApplications,
    getJobApplicationById,
    updateJobApplication,
    deleteJobApplication
} = require("../controllers/jobController");

const router = express.Router();

router.post("/", protect, createJobApplication);
router.get("/", protect, getJobApplications);
router.get("/:id", protect, getJobApplicationById);
router.put("/:id", protect, updateJobApplication);
router.delete("/:id", protect, deleteJobApplication);

module.exports = router;