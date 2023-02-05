
const mongodb=require('mongodb');
const getdb=require('../util/database').getdb;

class Task{
    constructor(title,description,status,projectId,id){
        
        this.title=title;
        this.description=description;
        this.status=status;
        this.projectId=projectId;
        this._id=new mongodb.ObjectId(id);
        console.log(this.projectId)
        
    }
    save(){
        const db=getdb();    
        let dbop;
        
        if(this._id){
            dbop=db.collection('tasks')
            .updateOne({_id:this._id},{$set:this})
        } else{
           
            dbop=db.collection('tasks')
            .insertOne(this)
        }
        return dbop
        .then((result)=>{
            // console.log(result);
        })
        .catch(err=>{console.log(err)})
    }
    

    static fetchAll(projectId,page,lmt){
        const db=getdb();  
        
        return db.collection('tasks')
        .find({projectId:projectId})
        .skip(parseInt(page)*parseInt(lmt))
        .limit(parseInt(lmt))
        .toArray()
        .then((project)=>{
            
            return project;
        })
        .catch(err=>{console.log(err)})
    }

    static searchingProject(projectId,word){
        const db=getdb();  
        
        return db.collection('tasks')
        .find({projectId:projectId,title:{$regex:".*"+word+".*",$options:'i'}})                
        .toArray()
        .then((project)=>{
            
            return project;
        })
        .catch(err=>{console.log(err)})

    }

    static sortingAlpha(projectId,kindOrder,page,lmt){
        const db=getdb(); 
        let dbst;  
        if(kindOrder=='accending')  {            
            dbst= db.collection('tasks')
            .find({projectId:projectId})
            .sort({title:1})
            .skip(parseInt(page)*parseInt(lmt))
            .limit(parseInt(lmt))
            .toArray()
        } else if(kindOrder=='deccending')  {
            dbst= db.collection('tasks')
            .find({projectId:projectId})
            .sort({title:-1})
            .toArray()
        }
        return dbst        
        .then((project)=>{
            console.log('project',project);
            return project;
        })
        .catch(err=>{console.log(err)})
    }
}
module.exports=Task;