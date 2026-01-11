const express = require("express");
const categoryController = require("../controller/categoryController");
const { auth } = require("../middlewares/auth");

const router = express.Router();

router.post("/events/:id/category", auth, categoryController.addCategoryToEvent);
router.post("/category", auth, categoryController.createCategory);
router.get("/category", auth, categoryController.getCategories);
router.put("/category/:id", auth, categoryController.updateCategory);
router.delete("/category/:id", auth, categoryController.deleteCategory);

module.exports = router;
