import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/food_route.js";
import userRouter from "./routes/user_route.js";
import 'dotenv/config'
import cartRouter from "./routes/cart_route.js";
import orderRouter from "./routes/order_route.js";

const app = express();
const port=4000;

app.use(express.json());
app.use(cors());

connectDB();

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