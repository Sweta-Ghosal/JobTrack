const JobApplication = require("../models/JobApplication");

// Create a new job application
const createJobApplication = async (req, res) => {
    try {
        const {
            company,
            jobTitle,
            jobType,
            location,
            applicationDate,
            status,
            jobUrl,
            notes
        } = req.body;

        // Check required fields
        if (!company || !jobTitle || !jobType) {
            return res.status(400).json({
                message: "Company, job title and job type are required"
            });
        }

        // Create job application
        const jobApplication = await JobApplication.create({
            user: req.userId,
            company,
            jobTitle,
            jobType,
            location,
            applicationDate,
            status,
            jobUrl,
            notes
        });

        res.status(201).json({
            message: "Job application created successfully",
            jobApplication
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


// Get all job applications for the logged-in user
const getJobApplications = async (req, res) => {
    try {
        const { search, status, jobType, page = 1, limit = 10 } = req.query;
        const pageNumber = Number(page);
const limitNumber = Number(limit);
const skip = (pageNumber - 1) * limitNumber;

        const query = {
            user: req.userId
        };

        // Search by company or job title
        if (search) {
            query.$or = [
                { company: { $regex: search, $options: "i" } },
                { jobTitle: { $regex: search, $options: "i" } }
            ];
        }

        // Filter by status
        if (status) {
            query.status = status;
        }

        // Filter by job type
        if (jobType) {
            query.jobType = jobType;
        }

        const jobApplications = await JobApplication.find(query)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitNumber);
    const totalCount = await JobApplication.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limitNumber);
res.status(200).json({
    count: totalCount,
    page: pageNumber,
    limit: limitNumber,
    totalPages,
    jobApplications
});

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Get a single job application
const getJobApplicationById = async (req, res) => {
    try {
        const jobApplication = await JobApplication.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!jobApplication) {
            return res.status(404).json({
                message: "Job application not found"
            });
        }

        res.status(200).json({
            jobApplication
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Update a job application
const updateJobApplication = async (req, res) => {
    try {
        const jobApplication = await JobApplication.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!jobApplication) {
            return res.status(404).json({
                message: "Job application not found"
            });
        }

        const {
            company,
            jobTitle,
            jobType,
            location,
            applicationDate,
            status,
            jobUrl,
            notes
        } = req.body;

        if (company !== undefined) jobApplication.company = company;
        if (jobTitle !== undefined) jobApplication.jobTitle = jobTitle;
        if (jobType !== undefined) jobApplication.jobType = jobType;
        if (location !== undefined) jobApplication.location = location;
        if (applicationDate !== undefined) jobApplication.applicationDate = applicationDate;
        if (status !== undefined) jobApplication.status = status;
        if (jobUrl !== undefined) jobApplication.jobUrl = jobUrl;
        if (notes !== undefined) jobApplication.notes = notes;

        const updatedJobApplication = await jobApplication.save();

        res.status(200).json({
            message: "Job application updated successfully",
            jobApplication: updatedJobApplication
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

// Delete a job application
const deleteJobApplication = async (req, res) => {
    try {
        const jobApplication = await JobApplication.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!jobApplication) {
            return res.status(404).json({
                message: "Job application not found"
            });
        }

        await JobApplication.deleteOne({
    _id: req.params.id,
    user: req.userId
});

        res.status(200).json({
            message: "Job application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    createJobApplication,
    getJobApplications,
    getJobApplicationById,
    updateJobApplication,
    deleteJobApplication
};
