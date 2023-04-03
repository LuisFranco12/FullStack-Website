require('dotenv').config()

const express = require('express')

const cors = require('cors')

const app = express()

const PORT = 8080

const connectDB = require('./config/db')
connectDB()

const { createEngine } = require('jsx-view-engine')

const methodOverride = require('method-override')

// routes variables
const storyRoutes = require('./routes/storyRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const commentRoutes = require('./routes/commentRoutes')
const userRoutes = require('./routes/userRoutes')

app.set('view engine', 'jsx')

app.engine('jsx', createEngine())

app.use(express.urlencoded({ extended: true }))

app.use(express.json())
app.use(cors())

app.use(methodOverride('_method'))

// routes
app.use('/story', storyRoutes)
app.use('/review', reviewRoutes) 
app.use('/comment', commentRoutes)
app.use('/users', userRoutes)

app.listen(PORT, ()=> {
    console.log('Listening on port ' + PORT)
})