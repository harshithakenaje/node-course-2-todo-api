// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db)=>{
    if(err){
       return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to Mongodb server');

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID('5a390564d2e113138b470429')
    // },{
    //     $set: {
    //         completed: true
    //     }
    // },{
    //     returnOriginal: false
    // }).then((result)=>{
    //     console.log(result);
    // });
    db.collection('User').findOneAndUpdate({
       _id: new ObjectID('5a38b52a3f9ca657505a4c04')
    },{
        $set: {
            name: 'Harshitha'
        },$inc: {
            age: 1
        }
        
    },{
        returnOriginal: false
    }).then((result)=>{
        console.log(result);
    });
    db.close();
});