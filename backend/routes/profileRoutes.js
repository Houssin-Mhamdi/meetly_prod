const express = require("express");
const profileController = require("../controller/profileController");

const router = express.Router();

// Routes mounted at /profile
router.get("/:slug", profileController.getProfile);
router.get("/:slug/events", profileController.getProfileEvents);
router.get("/:slug/full", profileController.getProfileFull);

module.exports = router;
