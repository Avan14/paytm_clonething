import jwt from "jsonwebtoken" 
const Jwt_secret = "Avann"

const suthMiddleware =  (req,res,next)=>{
    cosnt auth = req.headers.authorizaton;

    if(if(!auth || ! auth.startsWith("Bearer ")){
        return res.status.(403).json({});
    })
    const token = auth.split(' ')[1];
    try{
        const decoded = jwt.verify(token,jwt_secret);
        req.userID=decoded.userID
    }
}