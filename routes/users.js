const jwt = require('jsonwebtoken');
const jwtDecode = require('jwt-decode')
// const auth = require('./verifyEmail');
// apikey ff4f897b8bc0d97ccd3ed25a6b951fd3
const nodemailer = require('./mailer/nodemailer');

module.exports = (users,knex)=>{
    users.post('/signup',(req,res)=>{
        if(req.body.pass == req.body.confirmpass){
            user={email:req.body.email,pass:req.body.pass,name:req.body.name}
            var token = jwt.sign({user:user},'secret-key-here',{expiresIn:'24h'})
            var message = '<p>Click <a href="http://localhost:2070/confirmation?token=' + token + '">here</a> to confirm your email</p>'
            knex('users').insert({id:null,name:req.body.name,email:req.body.email,password:req.body.pass,status:'pending'})
            .then((status)=>{nodemailer.mailer(req.body.email,message)
                return res.send({"status":"200","message":"please visit your given email-address to confirm the mail!"})})
            .catch((err)=>{return res.send(err)})
        }
        else{
            return res.send('you password is missmatched!')
        }
    })

    users.get('/confirmation',(req,res)=>{
        var token = req.query.token;
        var data = jwtDecode(token)
        // console.log(data)
        var user = data.user;
        knex('users').where('email',user.email).andWhere('password',user.pass).update({
            status:'verified'
        })
        .then((status)=>{nodemailer.mailer(user.email,'Your email is verified successfully!');return res.redirect('http://localhost:2070/login')})
        .catch((err)=>{return res.send(err)})
    })

    users.post('/login',(req,res)=>{
        knex.select('*').where('email',req.body.email).andWhere('password',req.body.password).andWhere('status','verified').from('users')
        .then((data)=>{
            if(data.length<=0){
                return res.json('You have entered the wrong email-address or password')
            }
            else{
                return res.redirect('http://localhost:2070/zomatosearch')
            }
        })
        .catch((err)=>{return res.send(err)})
    })
}