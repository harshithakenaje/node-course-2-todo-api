// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db)=>{
    if(err){
       return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to Mongodb server');

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // },(err , result)=>{
    //     if(err){
    //         return console.log('Unable to insert to database');
    //     }
    //     console.log(JSON.stringify(result.ops, undefined , 2));
    // });

    // db.collection('User').insertOne({
    //     name: 'Danny',
    //     age: 3,
    //     location: 'Banglore'
    // },(err , result)=>{
    //     if(err){
    //         return console.log('Unable to inser the values');
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });
    db.close();
});