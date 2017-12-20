var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}= require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todos');

var app = express();

// app.use(bodyParser.json());
// app.post('/todos',(req,res)=>{
//      var todo = new Todo({
//          text: req.body.text
//      });
//     todo.save().then((doc)=>{
//         res.send(doc);
//     },(err)=>{
//         res.status(400).send(err);
//     });
// });

app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
    var todo= new Todo({
        text: req.body.text
    });
    todo.save().then((rec)=>{
        res.send(rec);
    },(e)=>{
        res.send(e);
    });
})

app.listen(3000,()=>{
    console.log('Server started at port 3000:');
});



module.exports = {app}