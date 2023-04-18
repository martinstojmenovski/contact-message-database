require('dotenv').config({ path: 'DATABASE_URL' })


const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL)
const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conected to Database'))


app.use(express.json())

const messagesRouter = require('./routes/content')
app.use('/messages', messagesRouter)



app.listen(3000, () => console.log("Server Started"))