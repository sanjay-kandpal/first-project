module.exports.home = function(req,res){
  /*cookie creation */
    //  console.log(req.cookies);
  //  res.cookie('user_id',25);
    return res.render('home',{
        title:"home"
    });

}

//module.exports.actionName = function(req,res){}