var mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

mongoose.Promises = global.Promises;
mongoose.connect(process.env.MONGODB_URI,{
    useMongoClient:true,
});

module.exports = {
    mongoose

}

// var mongoose = require('mongoose');
//  mongoose.Promise = require('bluebird');
//  mongoose.connect('mongodb://localhost:27017/basedir', {server: { poolSize: 5 }});