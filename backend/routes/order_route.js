import express from "express"
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userorders, verifyOrder } from "../controllers/order_controller.js"

const orderRouter=express.Router();

orderRouter.post("/place",authMiddleware,placeOrder)
orderRouter.post("/verify",verifyOrder)
orderRouter.post("/userorders",authMiddleware,userorders)
orderRouter.get("/list",listOrders)
orderRouter.post("/status",updateStatus)

export default orderRouter