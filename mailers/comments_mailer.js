const nodeMailer = require('../config/nodemailer');
//this is another way of importing function
exports.newComment = (comment) => {
  
    let htmlString = nodeMailer.renderTemplate({comment: comment},'/comments/new_comment.ejs');

    console.log('inside new mailer comment',comment);
    nodeMailer.transporter.sendMail({
    
        from: 'sanjaykandpal4@gmail.com',
        to: comment.user.email,
        subject: ' new comment published',
        html: htmlString

    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })

}