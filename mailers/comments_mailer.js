const nodeMailer = require('../config/nodemailer');
//this is another way of importing function
exports.newComment = (comment) => {
  
    console.log('inside new mailer comment',comment);
    nodeMailer.transporter.sendMail({
    
        from: 'sanjaykandpal4@gmail.com',
        to: comment.user.email,
        subject: ' new comment published',
        html: '<h1>Yup,comment now published</h1>'

    },(err,info)=>{
        if(err){
            console.log('error in sending mail',err);
            return;
        }
        console.log('Message sent',info);
        return;
    })

}