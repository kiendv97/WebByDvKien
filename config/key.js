module.exports = {
  
    mongoURI : function(){
        if(process.env.NODE_ENV === 'production'){
            return  'mongodb://project2:kiendv97@ds131551.mlab.com:31551/nodejs'
        }
        else return  'mongodb://localhost:27017/project2'
    }
     
    }
    
   
   
