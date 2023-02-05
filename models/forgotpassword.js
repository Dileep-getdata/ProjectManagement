const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;
const getdb=require('../util/database').getdb;

class Password{
    constructor(urlId,active,userId){
        this.urlId=urlId;
        this.active=active;
        this.userId=userId;
    }

    save(){
        const db=getdb();
        return db.collection('password')
        .insertOne(this)
        .then((result)=>{
            // console.log(result);
        })
        .catch(err=>{console.log(err)})
    }
    static updateById(proId,bool){
        const db=getdb();
        const myquery = { urlId: proId };
        const newvalues = { $set: {active: bool}};
        return db.collection('password')
        .updateOne(myquery,newvalues)
        .then((user)=>{            
            return user;
        })
        .catch(err=>{console.log(err)})
    }

    static findByUrlid(proId){
        const db=getdb();
        const myquery = { urlId: proId };
        const newvalues = { $set: {active: bool}};
        return db.collection('password')
        .find({urlId:new ObjectId(proId)}).next()
        .then((user)=>{            
            return user;
        })
        .catch(err=>{console.log(err)})
    }
}
module.exports=Password;