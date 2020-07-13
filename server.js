const express = require('express')
const mongoose = require('mongoose')
//const bodyParser = require('body-parser') npm remove body-parser
const items= require('./routes/api/items')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')
const config = require('config')

const app = express({ useUnifiedTopology: true })

app.use(express.json())

const db = config.get('MongoURI')

mongoose.connect(db, { useNewUrlParser : true,useUnifiedTopology: true, useCreateIndex:true })
    .then( ()=> console.log('Mongodb connected...') )
    .catch(err => console.log(err))

// Use routes:
app.use( '/api/items' ,items)
app.use( '/api/users' ,users)
app.use('/api/auth', auth)

const port = process.env.PORT || 5000

app.listen(port, () => console.log('server started at port 5000') )

