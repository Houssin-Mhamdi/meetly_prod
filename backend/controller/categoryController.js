const Event = require("../models/Event");
const Category = require("../models/Categories");
const catchAsync = require("../utils/catchAsync");

exports.addCategoryToEvent = catchAsync(async (req, res) => {
    const { categoryId } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) {
        const error = new Error("Event not found");
        error.statusCode = 404;
        throw error;
    }
    event.category = categoryId;
    await event.save();
    res.json(event);
});

exports.createCategory = catchAsync(async (req, res) => {
    const { name, description, color } = req.body;
    const category = await Category.create({ name, description, color, owner: req.user._id });
    res.json(category);
});

exports.getCategories = catchAsync(async (req, res) => {
    const categories = await Category.find({ owner: req.user._id })
    res.json(categories);
});

exports.updateCategory = catchAsync(async (req, res) => {
    const { name, description, color } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name, description, color }, { new: true });
    res.json(category);
});

exports.deleteCategory = catchAsync(async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json(category);
});
