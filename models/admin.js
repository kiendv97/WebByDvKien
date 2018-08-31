const mongoose = require('mongoose');

var Schema = mongoose.Schema;
 

var newAdmin = new Schema({
    fullname : {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    }, 
    img: {
        type: String
    }
},{
    collection: 'admin'
});

module.exports = mongoose.model('admin',newAdmin);