const jwt=require('jsonwebtoken')
const validateToken=(req,res,next)=>{
    const accessToken=req.headers['authorization']||req.query.accessToken;
    if(!accessToken) res.send('Access denied');
    jwt.verify(accessToken,process.env.SECRET, (err,admin)=>{
        if(err){
            res.send('Access denied, token expired or incorrect');
        }else{
            next()
        }
    })
}

module.exports=validateToken

