const express = require("express");
const router = express.Router();
const staffController = require("../controllers/staffController");
const { auth } = require("../middlewares/auth");

router.use(auth); // Protect all staff routes

router.post("/", staffController.createStaff);
router.get("/", staffController.getAllStaff);
router.get("/:id", staffController.getStaffById);
router.put("/:id", staffController.updateStaff);
router.delete("/:id", staffController.deleteStaff);

module.exports = router;
