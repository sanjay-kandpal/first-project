const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
const commentEmailWorker = require('../workers/comment_email_worker');
const queue = require('../config/kue');

module.exports.create =async function(req,res){
    try{
        let post = await Post.findById(req.body.post);
        if(post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });
                // handle error
                post.comment.push(comment);
                post.save();

             comment = await comment.populate('user','name email');
             //  commentsMailer.newComment(comment);
                 let job = queue.create('emails',comment).save(function(err){
                  if(err){
                      console.log('error in creating a queue ',err);
                      return;
                  }
                  console.log('job enqueued ',job.id);
              })
                if(req.xhr){
                   //similar for comments to fetch the user's id 


                   return res.status(200).json({
                       data: {
                           comment: comment
                       },
                       message: 'post created'
                   });
                }
   
                res.redirect('/');
        }
        
    }
    catch(err){
        console.log(err);
    }

 

}
// delete comment by authorised user
module.exports.destroy = async function(req,res){
    
   let comment = await Comment.findById(req.params.id);
      
   try {

    if(comment.user == req.user.id){
        let postId =  comment.post;
        comment.remove();
    let post =  Post.findByIdAndUpdate(postId, {$pull: {comments: req.params.id}});
            return res.redirect('back');
      }else{
        return res.redirect('back');
    }
       
   } catch (error) {
       console.log(error);
       return;
   }
 
      
    
}
