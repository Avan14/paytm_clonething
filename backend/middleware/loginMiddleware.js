import jwt from "jsonwebtoken" 
const Jwt_secret = "Avann"

const authMiddleware =  (req,res,next)=>{
    const auth = req.headers.authorizaton;

    if(!auth || ! auth.startsWith("Bearer ")){
        return res.status(403).json({});
    }
    const token = auth.split(' ')[1];
    try{
        const decoded = jwt.verify(token,Jwt_secret);
        req.userID=decoded.userID
        next();
    }
    catch(err){
        return res.status(403).json({});
    }
}
module.exports = authMiddleware;