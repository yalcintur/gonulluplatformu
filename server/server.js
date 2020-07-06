const express = require('express')
const app = express()
const cors = require('cors')
const knex = require('knex')
const bcrypt = require('bcrypt')

/*
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'yalcintur',
      password : '',
      database : 'gonulluplatformu'
    }
  })
  */

const db = knex({
    client: 'pg',
    connection: {
      host : 'balarama.db.elephantsql.com',
      port: "5432",
      user : 'acwuyxjb',
      password : 'qLpIMuFcbHjxfI0RIlATRAUs3wRwXvF1',
      database : 'acwuyxjb',
      ssl:true,
      }
  })
 
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const database = {
users:[
    {
    id: "123",
    username: "Yalcin",
    password: "werane"    
    },
    {
    id: "124",
    username: "Sinan",
    password: "kombacya"   
    }]
}

app.get('/', (req,res) =>{
    res.send(db)
})

app.get('/user/:id', (req,res) => {
    const { id } = req.params
    db('users').select('*').where({id})
    .then(user => {
        console.log(user)
        if(user.length){
            res.json(user[0])
        }
        else{
            res.status(400).send('not found')
        }
    })
    .catch(err => res.status(400).json('error'))
})

app.post('/signin', (req,res) => {
    db.select('email', 'hash').from('login')
        .where('email','=', req.body.email)
        .then(data => {
            const isValid = bcrypt.compareSync(req.body.password, data[0].hash)
            console.log(isValid)
            if (isValid){
                return db.select('*').from('users')
                .where('email','=', req.body.email)
                .then(user=>{
                    console.log(user)
                    res.status(200).json(user[0])
                })
                .catch(err => res.status(400).json('unable to get user'))
            }
            else{
                res.status(400).json('wrong credentials')
            }
        })
        .catch(err => res.status(400).json('error'))
})

app.post('/register', (req,res) => {
    const { email ,name, password, school } = req.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail =>{
            return db('users')
            .returning('*')
            .insert({
                email: loginEmail[0],
                name: name,
                school: school,
                joined: new Date()
            }).then(user => {
                res.json(user[0])
            })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    })
    .catch(err => res.status(400).json('unable to register'))
})

app.listen(3000)
