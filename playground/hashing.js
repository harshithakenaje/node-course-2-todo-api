const {SHA256}= require('crypto-js');
const jwt =require('jsonwebtoken');

var data = {
    id: 10
}

var token  = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token,'123abc');
console.log(decoded);

// var message = 'Iam a user number 3';
// var hash = SHA256(message).toString();

// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// var data ={
//     id: 4
// }

// var token = {
//     data,
//     hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.id)).toString();
// var resultHash = SHA256(JSON.stringify(data) + 'somesecret').toString();

// if(token.hash === resultHash){
//     console.log('Data was not changed');
// } 
// else {
//     console.log('Data has been changed');
// }