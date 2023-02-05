
const mongodb=require('mongodb');
const getdb=require('../util/database').getdb;

class Project{
    constructor(title,description,status,userId,id){
        this.title=title;
        this.description=description;
        this.status=status;
        this.userId=userId;
        this._id=new mongodb.ObjectId(id);
        
    }
    save(){
        const db=getdb();    
        let dbop;
        if(this._id){
            dbop=db.collection('projects')
            .updateOne({_id:this._id},{$set:this})
        } else{
            dbop=db.collection('projects')
            .insertOne(this)
        }
        return dbop
        .then((result)=>{
            // console.log(result);
        })
        .catch(err=>{console.log(err)})
    }
    

    static fetchAll(userId,page,lmt){
        const db=getdb();  
        
        return db.collection('projects')
        .find({userId:userId})
        .skip(parseInt(page)*parseInt(lmt))
        .limit(parseInt(lmt))
        .toArray()
        .then((users)=>{
            
            return users;
        })
        .catch(err=>{console.log(err)})
    }

    static searchingProject(userId,word){
        const db=getdb();  
        
        return db.collection('projects')
        .find({userId:userId,title:{$regex:".*"+word+".*",$options:'i'}})                
        .toArray()
        .then((users)=>{
            
            return users;
        })
        .catch(err=>{console.log(err)})

    }
    static sortStatus(state){
        const db=getdb();          
        return db.collection('projects')
        .find({status:state})                
        .toArray()
        .then((users)=>{
            
            return users;
        })
        .catch(err=>{console.log(err)})
    }
    static sortingAlpha(userId,kindOrder,page,lmt){
        const db=getdb(); 
        let dbst;  
        if(kindOrder=='accending')  {            
            dbst= db.collection('projects')
            .find({userId:userId})
            .sort({title:1})
            .skip(parseInt(page)*parseInt(lmt))
            .limit(parseInt(lmt))
            .toArray()
        } else if(kindOrder=='deccending')  {
            dbst= db.collection('projects')
            .find({userId:userId})
            .sort({title:-1})
            .toArray()
        }
        return dbst        
        .then((users)=>{
            console.log('project',users);
            return users;
        })
        .catch(err=>{console.log(err)})
    }
}
module.exports=Project;