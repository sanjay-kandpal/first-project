const User = require("../models/user");



module.exports.profile = function(req,res){
    return res.render('home',{
        title: "users page"
    });
}
 //render the sign up page
module.exports.signup = function(req,res){
    return res.render('user_sign_up',{
        title: 'codeial | sign_up'
    })
}
 //render the sign in page
module.exports.signin = function(req,res){
    return  res.render('user_sign_in',{
        title: 'Codeial | Sign In'
    })
}

//get the sign up data

module.exports.creates = function(req,res)
{  console.log(req.body);
    // TODO LATER
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email: req.body.email},function(err,user){
            if(err){
                console.log("error in finding user");
                return;
            }
            if(!user){
                User.create(req.body, function(err,user){
                    if(err){
                        console.log("error in Creating  user");
                        return;
                    }
                    return res.redirect('/users/sign-in');
                })
             }  
                else{
                    return res.redirect('back');
                }
            
    })
}
// sign in and create a session for user
module.exports.createSession = function(req,res){
    // steps to authenticate
    //find the user

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('error in finding user sign in by email id');
            return;
        }
   

    //handle user found
     if(user){
         //handle password which does not match
         if(user.password != req.body.password){
             return res.redirect('back');
         }

          //handle session creation
         res.cookie('user_id',user.id);
         return res.redirect('/users/profile');

     }else{
          //handle user not found
          return res.redirect('back');
     }
    
    }); 
    

    

    

}