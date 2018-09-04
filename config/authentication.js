module.exports = {
    isLogInUser : function(req,res,next){
       if(req.isAuthenticated()){
           next();
       }
       else {
           res.redirect('/users/login');
       }
    },
  isLoginAdmin : function(req,res,next){
      if(req.isAuthenticated()  && req.user.group === 'admin'){
          next();

      } else {
        res.redirect('/admin/dang-nhap.html');
    }
  }
}