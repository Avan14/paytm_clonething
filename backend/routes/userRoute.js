import express from "express";
import { z } from "zod";
import { Account, User } from "./db/database";
import { jwt } from "jsonwebtoken";
import auth from "../middleware/loginMiddleware"
import { User } from "../db/database";
const jwt_secret = "Avann";

const userRouter = express.Router();

// zod validation logic
const signupBody = z.object({
    username: z.string().email(),
	firstName: z.string(),
	lastName: z.string(),
	password: z.string()
});

const signinBody = z.object({
    username: z.string().email(),
	password: z.string()
})

userRouter.post('/signup', async (req,res,next) => {
    const { success } = signupBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({message : "Email already taken/ Incorrect inputs"});
    }

    const existingUser =  await userData.findOne({username : req.body.username});

    if(existingUser)
    {
        return res.status(411).json({message : "Email already taken"});
    }
    const user = await User.create({
        username : req.body.username,
        password : req.body.password,
        firstName : req.body.firstName,
        lastName : req.body.lastName,
    })

    const userId = user._id;
    const balance = 1 + Math.random() * 10000 ;

    await Account.create({
        userId,
        balance, 
    })

    const token = jwt.sign({
        userId
    },JWT_SECRET);
    res.status(200).json({message : "user created successfully", token : token, user : user});

});

userRouter.post('/signin', async(req,res,next) => {
    const {success} = signinBody.safeParse(req.body);
    if(!success)
    {
        return res.status(411).json({message : "Invalid Credentials"});
    }
    const user = await userData.findOne({
        username : req.body.username,
        password : req.body.password
    });

    if(!user)
    {
        return res.status(401).json("Invalid Credentials/User does not exist");
    }
    else
    {
        const token = jwt.sign({
            userId : user._id
        },JWT_SECRET);

        return res.status(200).json({token : token, user : user});
    }
    
})
userRouter.put('/', authMiddleWare, async(req,res,next)=>{
    const success = updateBody.safeParse(req.body);
    if(!success){
        return res.status(411).json({message : "Error while updating information"})
    }
    await userData.updateOne({ _id: req.userId }, req.body);
    res.json({message : "Updated successfully"});
});
userRouter.get('/bulk',auth,async (req,res,next) => {
    const filter = req.query.filter || "";
    const user = await User.find({
        $or : [{

            firstName : {"$regex" : filter}
        },{
            lastName : {"$regex" : filter}
        }
        ]
    })
    res.json({
        user: user.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})



module.exports = userRouter;
