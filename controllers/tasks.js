const Task=require('../models/tasks');
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

exports.postTaskDetails= async(req,res)=>{
    try{        
        const {title,description,status,projectId}=req.body;              
        if(isString(title)){        
            return  res.status(400).json({err:'Bad Title Input data'});
        }          
          const userId=req.user._id;          
            const task= await new Task(title,description,status,projectId,null);
            task.save()
            .then(()=>{
            return res.status(200).json({success:true,message:'Successfully Task added'});
    })
            .catch((err)=>{console.log(err)});             
               
   
}
    catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// Fetching all projects in userid including paggination
exports.getTaskList=async (req,res)=>{
    try{
        const projectId=req.body.projectId;
        const page=req.query.page ||0;
        const limt=req.query.limit||2;
        console.log(projectId)
        const taskList=await Task.fetchAll(new mongodb.ObjectId(projectId),page,limt);       
        
        return res.status(200).json({task:taskList,success:true,message:'Successfully Fetching tasks '});
       

    }catch(err){
        res.status(500).json({message:err,success:false});
    }

}
exports.editTaskStatus=async(req,res)=>{
    try{
        const {title,description,status,projectId,id}=req.body;              
        if(isString(title)){        
            return  res.status(400).json({err:'Bad Title Input data'});
        }          
          
            const task= await new Task(title,description,status,new mongodb.ObjectId(projectId),new mongodb.ObjectId(id)  );
            Task.save()
            .then(()=>{
            return res.status(200).json({success:true,message:'Successfully Task updated'});
        })
        .catch((err)=>{console.log(err)});   

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// sorting accending or deccending order including paggination
exports.sortingA_Z = async(req,res)=>{
    try{
        
        const projectId=req.body.projectId;
        const page=req.query.page ||0;
        const limt=req.query.limit||2;
        // In place of "accending" can place "deccending" to change order
        const order='accending';
        const taskList=await Task.sortingAlpha(new mongodb.ObjectId(projectId),order,page,limt);    
        
        return res.status(200).json({task:taskList,success:true,message:'Successfully Sorted projects '});

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}

// Searching project even with single letter from the project title gather all letter in title
exports.searching=async(req,res)=>{
    try{
       
        const projectId=req.body.projectId;
        const searchTitle=req.query.search;
        console.log(searchTitle)
        const tasskList=await Task.searchingProject(new mongodb.ObjectId(projectId),searchTitle);    
        
        return res.status(200).json({task:tasskList,success:true,message:'Successfully searched projects '});

    }catch(err){
        res.status(500).json({message:err,success:false});
    }
}