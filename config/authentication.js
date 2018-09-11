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
          req.flash('message','You are not admin ')
        res.redirect('/admin/auth/dang-nhap.html');
    }
  }
}