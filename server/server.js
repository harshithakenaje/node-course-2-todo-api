var express = require('express');
var bodyParser = require('body-parser');
var {ObjectID}= require('mongodb');

var {mongoose}= require('./db/mongoose');
var {User} = require('./models/user');
var {Todo} = require('./models/todos');

var app = express();
var port =  process.env.PORT || 3000;
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
     var todo = new Todo({
         text: req.body.text
     });
    todo.save().then((doc)=>{
        res.send(doc);
    },(err)=>{
        res.status(400).send(err);
    });
});

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
app.get('/todos',(req,res)=>{
    Todo.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400).send(err);
    })
})

app.delete('/todos/:id',(req,res)=>{
    var id= req.params.id;

     if(!ObjectID.isValid(id)){
   return res.status(404).send();
 }
 Todo.findByIdAndRemove(id).then((result)=>{
     if(!result){
         return res.status(404).send();
     }
     res.send(result);
 }).catch((e)=>{
     return res.status(400).send();
 })
});

 app.delete('/todos/:id',(req,res)=>{
     var id = req.params.id;
     if(!ObjectID.isValid(id)){
         return res.status(404).send();
     }

 })

app.listen(port,()=>{
    console.log(`Server at posrt: ${port}`);
});



module.exports = {app}