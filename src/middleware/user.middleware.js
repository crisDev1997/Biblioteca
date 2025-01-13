const jwt=require('jsonwebtoken')

module.exports=(req,res,next)=>{
    const authHeader=req.get('Authorization');
    if(!authHeader){
        const error=new Error("Not Authenticated");
        error.statusCode=401;
        throw error;
    }
    const token=authHeader;
    let decodedToken;
    try {
        decodedToken=jwt.verify(token, process.env.SECRET)
    } catch (error) {
        error.statusCode=500;
        throw error;
    }
    if(!decodedToken){
        const error=new Error("Not Authenticated");
        error.statusCode=401;
        throw error;
    }
    req.isLoggedIn=true;
    req.userId=decodedToken.userId;
    req.correo=decodedToken.correo;
    next();
}