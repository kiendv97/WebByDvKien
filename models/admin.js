const mongoose = require('mongoose');

var Schema = mongoose.Schema;
 

var newAdmin = new Schema({
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    }, 
    image: {
        type: String
    }
},{
    collection: 'admin'
});

module.exports = mongoose.model('admin',newAdmin);