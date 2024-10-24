const express = require("express");
const { z } = require("zod");
const { Account, User } = require("../db/database");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/loginMiddleware");
const userRouter = express.Router();
const JWT_SECRET = "Avann";  // Correct capitalization

// Zod validation schema
const signupBody = z.object({
    username: z.string().email(),
    firstName: z.string(),
    lastName: z.string(),
    password: z.string()
});

const signinBody = z.object({
    username: z.string().email(),
    password: z.string()
});

userRouter.post('/signup', async (req, res, next) => {
    const validation = signupBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({ message: "Email already taken/Incorrect inputs" });
    }

    const existingUser = await User.findOne({ username: req.body.username });  // Corrected User reference

    if (existingUser) {
        return res.status(411).json({ message: "Email already taken" });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    });

    const userId = user._id;
    const balance = 1 + Math.random() * 10000;

    await Account.create({
        userId,
        balance,
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.status(200).json({ message: "User created successfully", token: token, user: user });
});

userRouter.post('/signin', async (req, res, next) => {
    const validation = signinBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({ message: "Invalid Credentials" });
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        return res.status(401).json("Invalid Credentials/User does not exist");
    } else {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        return res.status(200).json({ token: token, user: user });
    }
});

userRouter.put('/', auth, async (req, res, next) => {
    const updateBody = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        password: z.string().optional(),
    });
    
    const validation = updateBody.safeParse(req.body);
    if (!validation.success) {
        return res.status(411).json({ message: "Error while updating information" });
    }

    await User.updateOne({ _id: req.userId }, req.body);
    res.json({ message: "Updated successfully" });
});

userRouter.get('/bulk', auth, async (req, res, next) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or: [
            { firstName: { "$regex": filter, "$options": "i" } },
            { lastName: { "$regex": filter, "$options": "i" } }
        ]
    });

    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    });
});

module.exports = userRouter;
