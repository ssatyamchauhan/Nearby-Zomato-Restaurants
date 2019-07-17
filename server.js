const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const database = require('./routes/database')



var app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.json())

var conn = {
    host:'localhost',
    user:'root',
    password:'Navgurukul',
    database:'zomato'
}
var knex = require('knex')({client:'mysql',connection:conn})


app.get('/signup',(req,res)=>{
    return res.render(__dirname+'/views/signup')
})

app.get('/login',(req,res)=>{
        return res.render(__dirname+'/views/login')
})

app.get('/zomatosearch',(req,res)=>{
    return res.render(__dirname+'/views/zomato')
})

var users = express.Router();
app.use('/',users)
require('./routes/users')(users,knex)

var zomatos = express.Router();
app.use('/',zomatos)
require('./routes/zomato')(zomatos,knex)




app.listen(2070,()=>{
    console.log('your app is listening')
})