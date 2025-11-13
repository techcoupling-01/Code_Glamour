const router = require('express').Router();
const { Branch } = require('../models/index');
const ApiResponse = require('../utils/ApiResponse');


router.post("/add", async (req, res) => {
    try {
        const branch = await Branch.create(req.body);
        res.json(new ApiResponse(true, "Branch added successfully", branch, null));
    } catch (err) {
        res.json(new ApiResponse(false, "Error adding branch", null, err.message));
    }
});

router.get("/branchlist", async (req, res) => {
    try {
        const branches = await Branch.findAll();
        res.json(new ApiResponse(true, "Branch list fetched successfully", branches, null));
    } catch (err) {
        res.json(new ApiResponse(false, "Error fetching branch list", null, err.message));
    }
});

router.get("/branch/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const branch = await Branch.findByPk(id);
        if (!branch) {
            res.json(new ApiResponse(false, "Branch not found", null, null));
        } else {
            res.json(new ApiResponse(true, "Branch fetched successfully", branch, null));
        }
    } catch (err) {
        res.json(new ApiResponse(false, "Error fetching branch", null, err.message));
    }
});


router.put("/update/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const branch = await Branch.findByPk(id);
        if (!branch) {
            return res.json(new ApiResponse(false, "Branch not found", null, null));
        }

        const [updated] = await Branch.update(req.body, { where: { id } });

        if (updated) {
            const updatedBranch = await Branch.findByPk(id);
            res.json(new ApiResponse(true, "Branch updated successfully", updatedBranch, null));
        } else {
            res.json(new ApiResponse(false, "Error updating branch", null, null));
        }
    } catch (err) {
        res.json(new ApiResponse(false, "Error updating branch", null, err.message));
    }
});

module.exports = router;
