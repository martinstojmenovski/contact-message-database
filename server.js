require('dotenv').config()


const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true})
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conected to Database'))


app.use(express.json())

const messagesRouter = require('./routes/content')
app.use('/messages', messagesRouter)



app.listen(process.env.PORT || 3000, () => console.log("Server Started"))   

