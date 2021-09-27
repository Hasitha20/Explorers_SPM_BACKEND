require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))
 
// Routes
app.use('/emp', require('./routes/empRouter'))
app.use('/api', require('./routes/categoryRouter'))
app.use('/upload', require('./routes/upload'))
app.use('/api', require('./routes/customerMessageRouter_manager'))
app.use('/empSal', require('./routes/employeePaymentsRouter'))

// Calling Routes
app.use('/user', require('./userRouter/userRouter'))
app.use('/api', require('./userRouter/foodsRouter'))
app.use('/api', require('./userRouter/upload'))
 
// KM
app.use('/api', require('./routes/uploadKM'))
app.use('/api', require('./routes/foodsRouter'))

//Routes
app.use('/csuser', require('./routes/csUserRouter'));
app.use('/api', require('./routes/csSavedReportRouter'));
app.use('/api', require('./routes/upload'));

 
//connect to DB
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected MongoDB")
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log('Server is running on PORT ', PORT)
 
})