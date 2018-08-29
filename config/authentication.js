module.exports = {
    isLogIn : function(req,res,next){
       if(req.isAuthenticated()){
           next();
       }
       else {
           res.redirect('/users/login');
       }
    }
 
}