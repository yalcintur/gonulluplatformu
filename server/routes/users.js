var express = require('express');
var knex = require('knex');
var router = express.Router();
var dbConfig = require('../db/config');
const bcrypt = require('bcrypt')

const db = knex({
    client: 'pg',
    connection: {
      host : dbConfig.host,
      port: dbConfig.port,
      user : dbConfig.user,
      password : dbConfig.password,
      database : dbConfig.database,
      ssl:true,
      }
  })

// const db = knex({
//     client: 'pg',
//     connection: {
//       host : '127.0.0.1',
//       user : 'yalcintur',
//       password : '',
//       database : 'gonulluplatformu'
//     }
//   })


router.get('/:id', (req,res) => {
    const { id } = req.params
    console.log(id)
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

router.post('/signin', (req,res) => {
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

router.post('/register', (req,res) => {
    console.log(1)
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

module.exports = router