// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db)=>{
    if(err){
       return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to Mongodb server');

    db.collection('User').find({name:'Danny'}).count().then((count)=>{
        console.log(`Todos count: ${count}`);
       
    },(err,result)=>{
        if(err){
            console.log('Unable to  fetch from mongodb',err);
        }
        console.log(JSON.stringify(results.ops, undefined ,2));
    });

    // db.collection('Todos').find().count().then((count)=>{
    //     console.log(`Todos count: ${count}`);
    //     // console.log(JSON.stringify(docs,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch from mongodb');
    // })

    db.close();
});