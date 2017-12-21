const {ObjectID}= require('mongodb'); 
const {mongoose}= require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result)=>{
//     console.log(result);
// })

Todo.findByIdAndRemove('5a3ba12e0f45c3971b2d0b7a').then((result)=>{
    console.log(result);
})