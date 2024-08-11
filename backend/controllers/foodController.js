import foodModel from "../models/foodModel.js";
import fs from "fs";



//add food item 

const addFood = async (req, res) => { 
    
    let image_filename = `${req.file.filename}`; //store file in image_filename

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename,
        
    });
    try {
        await food.save();
        res.json({sucess:true, message: "Food item added successfully"})
    } catch (error) {
        console.log(`Failed to add ${food} ${error}`);
        res.json({sucess:false, message: `Failed to add food item ${error}` })
    }
}

//all food list 

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({sucess:true, data:foods});
    } catch (error) {
        console.log(`Failed to fetch food items ${error}`);
        res.json({sucess:false, message: `Failed to fetch food items ${error}`})
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id); //delete from db
        res.json({sucess:true, message: "Food item deleted successfully"});
    } catch (error) {
        console.log(`Failed to delete item ${error}`);
        res.json({sucess:false, message: `Failed to delete item ${error}`})
    }

}



export {addFood, listFood, removeFood};
