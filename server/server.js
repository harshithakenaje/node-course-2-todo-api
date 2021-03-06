require('./config/config');

const path = require('path');
const http = require('http');
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todos');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const publicPath = path.join(__dirname,'/../public');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use(express.static(publicPath));
// done
app.post('/todos', authenticate, (req, res) => {
  var todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });
  todo.save().then((doc) => {
    res.send(doc);
    
  }, (e) => {
    res.status(400).send(e);
  });
});
// done
app.get('/todos', authenticate, (req, res) => {
  Todo.find({
    _creator: req.user._id
  }).then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOne({
    _id: id,
  _creator: req.user._id
}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.post('/todos/search',authenticate,(req,res)=>{
  var text = req.body.text;
  searchTodo=[];
  console.log(text);
  Todo.find({
    "text": new RegExp(text,'i'),
    _creator: req.user._id
  }).then((todos)=>{
    if(!todos){
      return res.status(404).send();
    }
    todos.forEach((todo)=>{
      searchRes={};
      searchRes.text=todo.text;
      searchRes.completed=todo.completed;
      searchTodo.push(searchRes);
    });
    console.log(searchTodo);
    res.send(searchTodo);
  }).catch((e)=>{
    res.status(400).send();
  });
});

app.post('/todos/findId',authenticate,(req,res)=>{
  var text=req.body.text;
  if(text===""){
    return res.status(404).send();
  }
  Todo.findOne({
    text,
    _creator: req.user._id
}).then((todo)=>{
  if(!todo){
    return res.status(404).send();
  }
  res.send(todo._id);
}).catch((e)=>{
  res.status(400).send();
});
  })
  

app.delete('/todos/:id',authenticate,(req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

app.patch('/todos/:id',authenticate, (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
// console.log(body.text);
  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
  _id: id,
  _creator: req.user._id
  }, {$set: body}, {new: true}).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  })
});

// POST /users
app.post('/user', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  })
});

app.get('/user/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/user/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  });
});

app.delete('/user/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.get('/user/logout',authenticate,(req,res)=>{
  // req.user.removeToken(req.token).then(()=>{
  //   res.status(200).send();
  // },()=>{
  //   res.status(400).send();
  // });
  res.send(req.user);
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};