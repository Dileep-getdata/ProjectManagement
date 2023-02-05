const Project=require('../models/project');
const mongodb=require('mongodb');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

function isString(string){
    if(string==undefined || string.length===0){
        return true;
    }else{
        return false;
    }
}

exports.postProjectDetails= async(req,res)=>{
    try{        
        const {title,description,status}=req.body;              
        if(isString(title)){        
            return  res.status(400).json({err:'Bad Title Input data'});
        }          
          const userId=req.user._id;
            const project= await new Project(title,description,status,userId,null);
            project.save()
            .then(()=>{
            return res.status(200).json({success:true,message:'Successfully project added'});
    })
            .catch((err)=>{console.log(err)});             
               
   
}
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// sorting projects based on status of each project
exports.statusSort=async (req,res)=>{
    try{
        const userId=req.user._id;
            const state=req.query.state || 'progress';
           const projectList=await  Project.sortStatus(state);
            
            return res.status(200).json({projects:projectList,success:true,message:'Successfully project sorted'});
        
        
    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// Fetching all projects in userid including paggination
exports.getProjectList=async (req,res)=>{
    try{
        const userId=req.user._id;
        const page=req.query.page ||0;
        const limt=req.query.limit||2;
        
        const projectList=await Project.fetchAll(userId,page,limt);       
        
        return res.status(200).json({projects:projectList,success:true,message:'Successfully Fetching project '});
       

    }catch(err){
        res.status(500).json({message:err,success:false});
    }

}
exports.editProjectStatus=async(req,res)=>{
    try{
        const {title,description,status,id}=req.body;              
        if(isString(title)){        
            return  res.status(400).json({err:'Bad Title Input data'});
        }          
          const userId=req.user._id;
            const project= await new Project(title,description,status,userId,new mongodb.ObjectId(id)  );
            Project.save()
            .then(()=>{
            return res.status(200).json({success:true,message:'Successfully project updated'});
        })
        .catch((err)=>{console.log(err)});   

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// sorting accending or deccending order including paggination
exports.sortingA_Z = async(req,res)=>{
    try{
        
        const userId=req.user._id;
        const page=req.query.page ||0;
        const limt=req.query.limit||2;
        // In place of "accending" can place "deccending" to change order
        const order='accending';
        const projectList=await Project.sortingAlpha(userId,order,page,limt);    
        console.log('ProjectList',projectList);
        return res.status(200).json({projects:projectList,success:true,message:'Successfully Sorted projects '});

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// Searching project even with single letter from the project title gather all letter in title
exports.searching=async(req,res)=>{
    try{
       
        const userId=req.user._id;
        const searchTitle=req.query.search;
        console.log(searchTitle)
        const projectList=await Project.searchingProject(userId,searchTitle);    
        console.log('ProjectList',projectList);
        return res.status(200).json({projects:projectList,success:true,message:'Successfully searched projects '});

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}