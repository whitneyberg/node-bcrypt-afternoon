require('dotenv').config()
const express = require('express')
const session = require('express-session')
const massive = require('massive')
const authCtrl = require('./controllers/authController')


const {CONNECTION_STRING, SESSION_SECRET} = process.env

const app = express()

const PORT = 4000

app.use(express.json())

app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: false,
        
     
    })
)

app.post('/auth/register', authCtrl.register)
app.post('/auth/login', authCtrl.login)

massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})

app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})