var mongoose = require('mongoose');

mongoose.Promises = global.Promises;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose

}