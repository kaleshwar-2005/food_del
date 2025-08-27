import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food_route.js";
import userRouter from "./routes/user_route.js";
import 'dotenv/config'
import cartRouter from "./routes/cart_route.js";
import orderRouter from "./routes/order_route.js";
import foodModel from "./models/food_model.js";

const app = express();
const port=4000;

app.use(express.json());
app.use(cors());

connectDB();

// Optionally auto-seed demo food items on startup (set SEED_ON_START=true)
async function maybeSeedOnStart() {
    try {
        if (process.env.SEED_ON_START === 'true') {
            const count = await foodModel.countDocuments({});
            if (count === 0) {
                const placeholderImage = "https://via.placeholder.com/300x200.png?text=Food";
                const demoItems = [
                    { name: "Greek salad", description: "Fresh and healthy.", price: 12, category: "Salad", image: placeholderImage },
                    { name: "Veg salad", description: "Crisp veggies.", price: 18, category: "Salad", image: placeholderImage },
                    { name: "Chicken Sandwich", description: "Grilled and tasty.", price: 12, category: "Sandwich", image: placeholderImage },
                    { name: "Cheese Pasta", description: "Creamy delight.", price: 12, category: "Pasta", image: placeholderImage },
                    { name: "Veg Noodles", description: "Stir-fried goodness.", price: 12, category: "Noodles", image: placeholderImage }
                ];
                await foodModel.insertMany(demoItems);
                console.log("Seeded demo food items on startup.");
            }
        }
    } catch (e) {
        console.log("Seeding skipped due to error:", e?.message || e);
    }
}
maybeSeedOnStart();

app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))
app.use("/api/user",userRouter)
app.use("/api/cart",cartRouter)
app.use("/api/order",orderRouter)

app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})


//mongodb+srv://kaleshwarlakaram2005:<db_password>@cluster0.onhqqwb.mongodb.net/?