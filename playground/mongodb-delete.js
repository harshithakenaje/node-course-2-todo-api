// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err , db)=>{
    if(err){
       return console.log('Unable to connect to MongoDb server');
    }
    console.log('Connected to Mongodb server');

    // db.collection('User').deleteMany({name: 'Danny'}).then((result)=>{
    //     console.log(result);
    // })
    // db.collection('User').deleteOne({name: 'Danny'}).then((result)=>{
    //     console.log(result);
    // })

    db.collection('User').findOneAndDelete({_id: new ObjectID('5a38bc566f4b8759569505df')}).then((result)=>{
        console.log(result);
    });
    db.close();
});