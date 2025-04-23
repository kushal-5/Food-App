import foodModel from "../models/foodModel.js";
import fs from 'fs'

// all food list
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// add food
const addFood = async (req, res) => {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ 
                success: false, 
                message: "No image file provided. Please upload an image." 
            });
        }

        // Validate required fields
        const { name, description, price, category } = req.body;
        if (!name || !description || !price || !category) {
            return res.status(400).json({
                success: false,
                message: "All fields (name, description, price, category) are required"
            });
        }

        const food = new foodModel({
            name: name,
            description: description,
            price: price,
            category: category,
            image: req.file.filename
        });

        await food.save();
        res.json({ 
            success: true, 
            message: "Food Added Successfully",
            data: food 
        });
    } catch (error) {
        console.log("Error adding food:", error);
        res.status(500).json({ 
            success: false, 
            message: "Error adding food",
            error: error.message 
        });
    }
}

// delete food
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food not found" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Error deleting image:", err);
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error removing food" });
    }
}

export { listFood, addFood, removeFood }