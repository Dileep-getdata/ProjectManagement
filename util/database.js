const mongodb=require('mongodb');
const mongodbClient=mongodb.MongoClient;

let _db;

const mongodbConnect=callback=>{
    
    mongodbClient.connect(
        'mongodb://dileep:w2WBO0FKl5Nhu72d@ac-lkm2erf-shard-00-00.zchvbrj.mongodb.net:27017,ac-lkm2erf-shard-00-01.zchvbrj.mongodb.net:27017,ac-lkm2erf-shard-00-02.zchvbrj.mongodb.net:27017/?ssl=true&replicaSet=atlas-dizasn-shard-0&authSource=admin&retryWrites=true&w=majority'
    ).then(client=>{
        
        _db=client.db();
        callback();
        console.log('Connected!');
    })
    .catch((err)=>{
        console.log(err);
        throw err;
    });
}

const getdb=()=>{
    if(_db){
        return _db;
    }
    throw "No database found";
}   

exports.mongodbConnect=mongodbConnect;
exports.getdb=getdb;    