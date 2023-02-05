const jwt=require('jsonwebtoken');
const User=require('../models/user');

exports.authentication=async(req,res,next)=>{
    try{
        
        const token=req.headers.authentication;
        const user=(jwt.verify(token,process.env.TOKEN_SECREATKEY));
        
        const userDetails=await User.findById(user.id);
                   
            req.user=userDetails; 
                      
            next();
        

    }catch(err){
        res.status(500).json({success:false,message:'Something went wrong in Auth',error:err});
    }
}