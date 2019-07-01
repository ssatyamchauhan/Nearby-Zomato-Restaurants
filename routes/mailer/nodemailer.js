var nodemailer = require('nodemailer')

module.exports.mailer= (email,message)=>{
    
    var transporter = nodemailer.createTransport({
	service:'gmail',
	auth:{
		user:"satyam18@navgurukul.org",
		pass:"Mr.singh"
		}
});

    var mailOptions = {
        from:'satyam18@navgurukul.org',
        to: email,
        subject:'Verification mail',
        html: message
    }

    transporter.sendMail(mailOptions,(err,result)=>{
        if(!err){console.log(result)}
        else{console.log('Your mail has sent successfully!')}
    })

}