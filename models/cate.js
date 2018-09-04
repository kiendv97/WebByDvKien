const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var cate = new Schema({
    name : { 
        type: String
    }
}); 

module.exports = mongoose.model('cate', cate , 'cate');