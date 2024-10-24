import express from 'express';
import cors from "cors"

const app = express();
app.use(cors());
app.use(express.json());

import mainRouter from "./routes/routes" 
app.use("/api/v1",mainRouter)

app.listen(3000,()=>{
    console.log("listining at port 3000 :]");
    
})