import express from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';
import { Transaction,User } from './db/database';
import mainRouter from "./routes/routes" 

const app = express();

app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("listining at port 3000 :]");
    
})