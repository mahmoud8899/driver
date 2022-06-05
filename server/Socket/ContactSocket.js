const cors = require('cors')
const app = require('../app')
const http = require('http').createServer(app)
const schedule = require('node-schedule')
const {
    CheckInOrder,
    TakeOrder,
    ViewsAllDriversOrder,
    CheckInTheWay,
    Concalcaltion,
    ChangeOrderStatus,
    OrderCheckingIsAvailable
} = require('./DriverSocket')
// chat 
const {
    ViewChat,
    ViewMessageChat,
    SendMessageUserMessage,

} = require('./Message')

// user lists...
const {
    users,
    addUser,
    removeUser,
    getUser,
} = require('./UserListDriver')



// Resturant Online  
const {
    Resturant,
    ResturantAddUser,
    ResturantRemoveUser,
    ResturantGetUser,
} = require('./ResturantOnline')
// contact db order och check order 
const NewOrderSocket = require('./OrderSocket')

const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})




io.on('connection', socket => {



    // online Users
    socket.on('join', async (userId) => {
        // console.log('yes',userId)
        addUser(userId, socket.id)
        io.emit('getUser', users)
        // console.log('send users', userId)
    })


    // online resturant 
    socket.on('ResturantJoin', async (resturantid) => {

        ResturantAddUser(resturantid, socket.id)
        io.emit('getUser', Resturant)


        console.log('send users', Resturant)
    })


    // socket get id restrant after pays
    socket.on('getrestrantid', async (idrestrant) => {

        const { error, order } = await NewOrderSocket(idrestrant)
        if (!error) {

            const CheckRest = await ResturantGetUser(idrestrant)

            if (CheckRest) {

                io.to(CheckRest.socketId).emit('NewOrder', order)

            } else {

                return console.log('User is not Online....')
            }

        } else {


            return console.log('error create new order.....')
        }



        // coming db.....
        // console.log(order)

    })





    /////// --------------------------------------- Start Driver Socket -----------------------////
    // driver real time  3 options  this is important read 
    //[1]:confirm - this is check Available orders to drivers.
    //[2]:OrderCheckingIsAvailable  -  order checking is available
    //[3]:clickConfirm  - change state order to driver and order
    //[4]:UserNext - show order after change state to order and driver 
    // 


    // orders Available to drivers....
    // [1] pageNumber is number to pagation order list...
    // [2] CheckInOrder check order available in server to drivers...
    socket.on('confirm', async (pageNumber) => {

        console.log(' number Page',pageNumber)

        const dataAvailable = await CheckInOrder(pageNumber)

        dataAvailable && io.emit('available', dataAvailable)
    })


    // check the order before getting it
    socket.on('OrderCheckingIsAvailable', async (orderId, UserId) => {

        const CheckOrder = await OrderCheckingIsAvailable(orderId)
        const user = await getUser(UserId)
        if (user) {
            io.to(user.socketId).emit('IsAvailable', CheckOrder)

        } else {
            return console.log('User dos not Online Here...')

        }
    })



    // changes orders state to confirm and drlivery
    // [1] TakeOrder is change order state to confirm or delivery or the way your order..
    // [2] getUser this check user is Oline.....
    socket.on('clickConfirm', async ({ confirmId, userid, changeStatus, createDriver }) => {
        // console.log('here is')
        const result = await TakeOrder(confirmId, userid, changeStatus, createDriver)
        if (result) {
            const user = await getUser(userid)
            user && io.to(user.socketId).emit('UpdateUser', 'try')
        }
        else console.log('not result ..... error')
    })



    // show orders after change state to driver 
    socket.on('UserNext', async (userId, Status) => {
        console.log('run herer herer here', userId, Status)

        const driver = await ChangeOrderStatus(userId, Status)
        const user = await getUser(userId)
        if (user) {
            console.log('send')
            io.to(user.socketId).emit('NextConfirm', driver)
            const mJob = schedule.scheduleJob('*/1 * * * *', function () {
                mJob.cancel()
                io.to(user.socketId).emit('AlertNextConfirm', 'Alert')
            })
        } else {
            console.log('not send')
        }
    })



    /////// --------------------------------------- End Driver Socket -----------------------////




    // disconnect users...
    socket.on('disconnect', () => {
        removeUser(socket.id)
        ResturantRemoveUser(socket.id)
        io.emit('getUser', users)
        console.log('logout...')
    })



})



module.exports = http

