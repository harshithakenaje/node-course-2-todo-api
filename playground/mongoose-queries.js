const {ObjectID}= require('mongodb'); 
const {mongoose}= require('./../server/db/mongoose');
// const {Todo} = require('./../server/models/todos');
const {User} = require('./../server/models/user');

var id = '5a3a03fbc27e795c1ff8f529';

User.findById(id).then((todo)=>{
    if(!todo){
        return console.log('No todos with id');
    }
    console.log('Tod:',todo);
});
// if(!ObjectID.isValid(id)){
//     console.log('Id is not valid');
// }
// Todo.find({
//     _id: id
// }).then((todos)=>{
// console.log('Todos:',todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//  console.log('Todo:',todo);
// });

// Todo.findById(id).then((todo)=>{
//     if(!todo){
//         return console.log('Todo not found');
//     }
//     console.log('Todo by ID:',todo);
// }).catch((err)=>{
//     console.log('Error:',err);
// })