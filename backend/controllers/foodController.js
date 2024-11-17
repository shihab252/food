import foodModel from "../models/foodModel.js";
import fs from 'fs';
import path from 'path';

// Add food item
const addFood = async (req, res) => {
    const image_filename = req.file?.filename; 

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
    });

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ success: false, message: "Error: food not added" });
    }
};

// List all food items
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error retrieving food list" });
    }
};
// Edit food item
const editFood = async (req, res) => {
    const { id, name, description, price, category } = req.body;
    try {
        const food = await foodModel.findById(id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        food.name = name;
        food.description = description;
        food.price = price;
        food.category = category;

        await food.save();
        res.json({ success: true, message: "Food item updated" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error updating food item" });
    }
};


// Remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const imagePath = path.join('uploads', food.image);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error("Error deleting image:", err);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error removing food item" });
    }
};

export { addFood, listFood, removeFood, editFood };
