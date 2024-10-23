import express from "express";
import userRouter from "./userRoute"
import TransactionRouter from "./TransactionRoute"

export const router = express.Router();

router.get("/user",userRouter);
router.get("/transaction",TransactionRouter);


router.get("/*",(req,res)=>{
    res.json({
        msg:"invald request"
    }).status(404)
})

