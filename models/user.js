 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;
 

 var user = new Schema({
     fullname : {
         type: String,
         required: true
     },
     email : {
         type: String,
         required : true
     },
     password : { 
         type: String,
         required : true
     },
     phone : { 
         type : Number
     },
     address : {
          type : String
     }
 });

 module.exports = mongoose.model('user',user);