require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app= express()
const env = process.env
const authRoutes = require('./routes/authRoutes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(bodyParser.json());

mongoose.connect(env.DB_URL).then(()=>{
    console.log('Connected database');
}).catch((err)=>{
    console.error('Failed to connect to the database', err);
})

app.use('/',authRoutes)

app.listen(env.PORT,()=>{
    console.log('https://localhost:'+env.PORT);  
})