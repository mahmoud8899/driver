const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()

const mongoose = require('mongoose')





mongoose.connect(process.env.MONGOOSE_URL,
    { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }, (err, info) => {
        if (!err) console.log('mongoose......')
    })



app.set('view engine', 'ejs')
app.set('views', 'views')



app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    express.static(path.join(__dirname, 'views')),
    express.static(path.join(__dirname, 'views/css/')),
    cors({
        origin: 'http://localhost:8000/',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })



])



app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})





app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
const RouteUser = require('./router/AuthRouter')
const ProductRouter = require('./router/ProductRouter')
const uploading = require('./router/upload')
const OrderRoutering = require('./router/OrderRouter')
const CartAdd = require('./router/CartRouter')
const category = require('./router/CategoryRouter')
const discountRouter = require('./router/DiscountRouter')
const WorkRouter = require('./router/WorkRouter')
const ContactRouter = require('./router/ContactRouter')
const AboutRouter = require('./router/AboutRoute')
const CookRouter = require('./router/CookRoute')
const DriverRouter = require('./router/DriverRouter')
const MessageChat =  require('./router/MessageChatRouter')
const cartinfoRouter =  require('./router/CartInfoRoute')
const FoodTypesRouter = require('./router/FoodTypesRouter')
app.use('/api/',
    [
        RouteUser,
        ProductRouter,
        OrderRoutering,
        uploading,
        CartAdd,
        category,
        discountRouter,
        WorkRouter,
        ContactRouter,
        AboutRouter,
        CookRouter,
        DriverRouter,
        MessageChat,
        cartinfoRouter,
        FoodTypesRouter



    ])










app.get('/', (req, res) => {
    res.json('API is running....')
})








module.exports = app