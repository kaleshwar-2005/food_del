import jwt from "jsonwebtoken"

const authMiddleware=async (req,res,next)=>{
    let token = req.headers.token || req.headers.authorization;
    if (token && typeof token === 'string' && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    if(!token)
    {
        return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try {
        const secret = process.env.JWT_SECRET || "dev_jwt_secret";
        const tokenDecode=jwt.verify(token,secret)
        req.body.userId=tokenDecode.id;
        next();
    } catch (error) {
        console.log("Auth error", error)
        res.json({success:false,message:"Error"})
    }
}

export default authMiddleware