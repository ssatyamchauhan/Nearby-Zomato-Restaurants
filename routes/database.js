const mysql = require('mysql');

var conn = {
    host:'localhost',
    user:'root',
    password:'Navgurukul',
    database:'zomato'
}
var knex = require('knex')({client:'mysql',connection:conn})

knex.raw('CREATE DATABASE IF NOT EXISTS zomato')
    .then((data)=>{console.log('createDb successfully!')})
    .catch((err)=>{console.log(err.message)})

knex.schema.hasTable('users').then((exists)=>{
    if(!exists){
        return knex.schema.createTable('users',(t)=>{
            t.increments('id').primary();
            t.string('name',100).notNullable();
            t.string('email').unique().notNullable();
            t.string('password').notNullable();
            t.string('status').notNullable();
        })
    .catch((err)=>{console.log(err.message)})
    }
    return console.log('table is created!')
})
