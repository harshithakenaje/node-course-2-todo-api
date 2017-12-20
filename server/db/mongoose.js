var mongoose = require('mongoose');

mongoose.Promises = global.Promises;
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
    mongoose

}