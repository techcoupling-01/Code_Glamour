const router = require('express').Router();
const ApiResponse = require('../utils/ApiResponse');
const { Staff } = require('../models'); 


router.post("/add", async (req, res) => {
  try {
    const staff = await Staff.create(req.body);
    res.json(new ApiResponse(true, "Staff added successfully", staff, null));
  } catch (err) {
    res.json(new ApiResponse(false, "Error adding staff", null, err.message));
  }
});

router.get("/list", async (req, res) => {
  try {
    const staffList = await Staff.findAll();
    res.json(new ApiResponse(true, "Staff list fetched successfully", staffList, null));
  } catch (err) {
    res.json(new ApiResponse(false, "Error fetching staff list", null, err.message));
  }
});

router.get("/branch/:branchId", async (req, res) => {
  try {
    const staffList = await Staff.findAll({
      where: { branchId: req.params.branchId },
    });
    res.json(new ApiResponse(true, "Staff list by branch fetched successfully", staffList, null));
  } catch (err) {
    res.json(new ApiResponse(false, "Error fetching staff by branch", null, err.message));
  }
});

router.get("/role/:role", async (req, res) => {
  try {
    const staffList = await Staff.findAll({
      where: { role: req.params.role },
    });
    res.json(new ApiResponse(true, "Staff list by role fetched successfully", staffList, null));
  } catch (err) {
    res.json(new ApiResponse(false, "Error fetching staff by role", null, err.message));
  }
});

router.put("/update/:id", async (req, res) => {
  try {
    const staff = await Staff.findByPk(req.params.id);
    if (!staff) {
      return res.json(new ApiResponse(false, "Staff not found", null, null));
    }

    const [updated] = await Staff.update(req.body, { where: { id: req.params.id } });

    if (updated) {
      const updatedStaff = await Staff.findByPk(req.params.id);
      res.json(new ApiResponse(true, "Staff updated successfully", updatedStaff, null));
    } else {
      res.json(new ApiResponse(false, "Staff not updated", null, null));
    }
  } catch (err) {
    res.json(new ApiResponse(false, "Error updating staff", null, err.message));
  }
});

module.exports = router;
