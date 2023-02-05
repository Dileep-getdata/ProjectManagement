
const mongodb=require('mongodb');
const ObjectId=mongodb.ObjectId;
const getdb=require('../util/database').getdb;

class User{
    constructor(name,email,password,phoneno,age,gender){
        this.name=name;
        this.email=email;
        this.password=password;
        this.phoneno=phoneno;
        this.age=age;
        this.gender=gender;
    }

    save(){
        const db=getdb();
        return db.collection('users')
        .insertOne(this)
        .then((result)=>{
            // console.log(result);
        })
        .catch(err=>{console.log(err)})
    }
    static findByEmail(valu){
        const db=getdb();
        return db.collection('users')
        .find({email:valu}).next()
        .then((user)=>{
            // console.log('user',user);
            return user;
        })
        .catch(err=>{console.log(err)})
    }
    static updatePass(proId,newPass){
        const db=getdb();
        return db.collection('users')
        .updateOne({_id:new ObjectId(proId)},{password:newPass})
        .next()
        .then((user)=>{            
            return user;
        })
        .catch(err=>{console.log(err)})

    }
    static findById(proId){
        const db=getdb();
        return db.collection('users')
        .find({_id:new ObjectId(proId)})
        .next()
        .then((user)=>{            
            return user;
        })
        .catch(err=>{console.log(err)})
    }

    

    static fetchAll(){
        const db=getdb();        
        return db.collection('users')
        .find().toArray()
        .then((users)=>{
            console.log(users);
            return users;
        })
        .catch(err=>{console.log(err)})
    }
}
module.exports=User;