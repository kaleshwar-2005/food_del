import foodModel from "../models/food_model.js";
import fs from "fs";
//add food item
const addFood=async(req,res)=>{
    let img_filename= `${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:img_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listFood=async (req,res)=>{
    try{
        const foods= await foodModel.find({})
        res.json({success:true,data:foods})
    }
    catch(error)
    {
        console.log("Error");
        res.json({success:false,message:"Error"})
    }
}

const removeFood=async (req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id)
        fs.unlink(`uploads/${food.image}`,()=>{})

        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addFood,listFood,removeFood}

// --- Development helper: seed demo food items ---
export const seedDemoFood = async (req, res) => {
    try {
        const count = await foodModel.countDocuments({});
        if (count > 0) {
            return res.json({ success: false, message: "Database already has food items" });
        }

        const placeholderImage = "https://via.placeholder.com/300x200.png?text=Food";
        const demoItems = [
            { name: "Greek salad", description: "Fresh and healthy.", price: 12, category: "Salad", image: placeholderImage },
            { name: "Veg salad", description: "Crisp veggies.", price: 18, category: "Salad", image: placeholderImage },
            { name: "Chicken Sandwich", description: "Grilled and tasty.", price: 12, category: "Sandwich", image: placeholderImage },
            { name: "Cheese Pasta", description: "Creamy delight.", price: 12, category: "Pasta", image: placeholderImage },
            { name: "Veg Noodles", description: "Stir-fried goodness.", price: 12, category: "Noodles", image: placeholderImage },
            { name: "Jar Ice Cream", description: "Sweet treat.", price: 10, category: "Deserts", image: placeholderImage },
            { name: "Cup Cake", description: "Soft and sweet.", price: 14, category: "Cake", image: placeholderImage },
            { name: "Peri Peri Rolls", description: "Spicy rolls.", price: 12, category: "Rolls", image: placeholderImage }
        ];

        await foodModel.insertMany(demoItems);
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods, message: "Seeded demo food items" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error seeding demo items" });
    }
}