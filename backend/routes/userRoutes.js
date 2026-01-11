const express = require("express");
const userController = require("../controller/userController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.get("/users", auth, userController.getUsers);
router.get("/users/:id/google-status", userController.getGoogleStatus);

module.exports = router;
