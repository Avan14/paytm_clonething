import express from "express";
import { z } from "zod";
import { Transaction, User } from "./db/database";
import { jwt } from "jsonwebtoken";
const jwt_secret = "Avann";

const userRouter = express.Router();

// zod validation logic
const transaction_validation = z.object({
    sender: z.string(), // String for sender
    receiver: z.string(), // String for receiver
    amount: z.number(), // Number for amount
    transaction: z.string(), // String for transaction identifier
});

const userSchema = z.object({
    userName: z.string().min(3).max(30), // String, required, with min 3 and max 30 characters
    balance: z.number().optional(), // Optional number for balance
    transactions: z.array(transaction_validation), // Array of transaction objects
});

// route handlers
userRouter.post("/signup", async (req, res) => {
    const { valid } = transaction_validation.safeParse(req.body);
    if (!valid) {
        res
            .json({
                msg: "invald request",
            })
            .status(404);
    }
    const if_exist = await User.findone({
        userName: req.body.username,
    });
    if (if_exist) {
        res
            .json({
                msg: "user already exists",
            })
            .status(411);
    }
    const user = user.create({
        userName: req.body.username,
        balance: req.body.balance,
        transactions: req.body.Transaction,
    });
    const userID = user._id;
    const token = jwt.sign({ userID }, jwt_secret);
    res.status(200).json({
        msg: "user succesfully created",
        token: token,
    });
});







module.exports = userRouter;
