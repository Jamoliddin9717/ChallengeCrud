const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const session = require('express-session')
const passport = require('passport')
const cookieParser = require('cookie-parser');

const app = express();


const r_Index = require('./routers/index')
const r_login = require('./routers/login')
const r_Create_Account = require('./routers/createAccount')
const r_Account = require('./routers/account')
const r_Add = require('./routers/add')
const r_Admin = require('./routers/admin')

require('./helper/db')()

app.set('view engine', 'pug')


app.use(require('connect-flash')())
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res)
  next()
})

app.use(session({
  secret : "SecretKey",
  resave: true,
  saveUninitialized : false 
}))


app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended: true
}))

require('./middleware/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());


app.get('*' , (req , res , next) => {
  res.locals.user = req.user || null
  next()
})

app.use(r_Index)
app.use(r_login)
app.use(r_Create_Account)
app.use(r_Account)
app.use(r_Add)
app.use(r_Admin)

app.listen(5000)