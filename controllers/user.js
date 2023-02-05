
const Users=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function isString(string){
    if(string==undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

// <<<<<<<<<  Posting the SIGN-UP details in Database  >>>>>>>>>>
// 
exports.postSignupDetails= async(req,res)=>{
    try{        
        const {name,email,password,phoneno,age,gender}=req.body;    
          
        if(isString(name) || isString(email) || isString(password)){        
            return  res.status(400).json({err:'Bad Input data'});
        }
        const saltrounds=10;
        bcrypt.hash(password,saltrounds, async(err,hash)=>{   
            const user= await new Users(name,email, hash,phoneno,age,gender, );
            Users.findByEmail(email)
            .then((result)=>{
                
                if(result!=null && email===result.email ){   
                    console.log('Email check')             
                    return res.status(404).json({success:false,message:'Exiting Email Id'}); 
                } else{
                    user.save()
                    .then(()=>{
                    return res.status(200).json({success:true,message:'Successfully signed Up'});
            })
                }
            }) 
            .catch((err)=>{console.log(err)});             
               
    })
}
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}
// >>>>>>>>>>>>  END     <<<<<<<<<<<<<


// <<<<<<<<<  Posting the LOG-IN details and Autenticate emailUser  >>>>>>>>>>
// 
exports.postLogin=(req,res)=>{
    try{
        const{email,password}=req.body;        
        if(isString(email) || isString(password)){
            return res.status(400).json({err:'Bad Input'});
        }
        Users.findByEmail(email)
            .then((user)=>{   
                        
                if(user!==undefined){ 
                    bcrypt.compare(password,user.password,(err,result)=>{
                        if(err){
                            throw new Error('Something went wrong inLogin bcrypt compare');
                        }
                        // console.log(result);
                        if(result===true){
                            console.log(user._id);
                            const token = tokenGenrate(user._id,user.name);
                            return  res.status(200).json({success:true,message:'Succesfully loged in',token:token});
                        }else{
                            return res.status(401).json({success:false,message:'Wrong password'});
                        }
                    })                  
                   
                }else{
                    return res.status(404).json({success:false,message:'Not registered Sign Up'});
                }
            })
            .catch(err=>console.log(err));
    }catch(error){
        res.status(500).json({error});
    }
};
// >>>>>>>>>>>>  END     <<<<<<<<<<<<<

function tokenGenrate(id,name){
     return jwt.sign({id,name},process.env.TOKEN_SECREATKEY);
}

// exports.getSignupDetails=(req,res)=>{
//     console.log(req.body);
// }