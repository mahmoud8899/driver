const app = require('./app')
const cors = require('cors')


const {
    CheckInOrder,
    TakeOrder,
    ViewsAllDriversOrder,
    CheckInTheWay,
    Concalcaltion,
} = require('./Socket/DriverSocket')

// chat 
const {
    ViewChat,
    ViewMessageChat,
    SendMessageUserMessage,

} = require('./Socket/Message')
// // users 
// const {
//     addUser,
//     removeUser,
//     getUser,
//     users
// } = require('./Socket/User')
const http = require('http').createServer(app)
const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:8000",
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    }
})




let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};






io.on('connection', socket => {

    // console.log('socker', socket.id)

    // online Users
    socket.on('join', async (userId) => {
        addUser(userId, socket.id)
        io.emit('getUser', users)


        console.log('send users', users)
    })


    socket.on('confirm', async (test) => {

        const dataAvailable = await CheckInOrder()

        dataAvailable && io.emit('available', dataAvailable)
    })



    // confirm 
    socket.on('clickConfirm', async ({ confirmId, userid }) => {

        const result = await TakeOrder(confirmId, userid)
        if (result) {
            const dataAvailable = await CheckInOrder()
            io.emit('available', dataAvailable)
        }
        else console.log('not result ..... error')
    })


    // views all orders. to user..
    socket.on('Userprofile', async (userid) => {

        const userorder = await ViewsAllDriversOrder(userid)
        if (userorder) {

            // console.log(userorder)

            io.emit('userorder', userorder)
        } else {

            return console.log('err')
        }


    })




    // // view chat
    // socket.on('takeUserid', async (userid) => {

    //     const result = await ViewChat(userid)

    

    //     if (result === 'create a chat..') {


    //         const user = getUser(userid)
    //         user ? io.to(user.socketId).emit('infoMessage', result) : console.log('not user....')

    //     } else {

    //         const user = getUser(userid)
    //         user ? io.to(user.socketId).emit('infoMessage', result) : console.log('not create not user...')

    //     }
    // })

    // // view all chat with servis.
    // socket.on('ViewMessage', async (chatid, userid) => {
    //     const data = await ViewMessageChat(chatid)
    //     // console.log('data',data)
    //     if (data) {
    //         const user = getUser(userid)
    //         io.to(user.socketId).emit('viewMag', data)
    //     } else {
    //         console.log('error')
    //     }

    // })



    socket.on('sendM', async ({ chatid, userid, text, lastUser, image }) => {
        //  console.log('coming',chatid, userid, text, lastUser, image )
        const { error, savaChat } = await SendMessageUserMessage(chatid, userid, text, image)
        if (!error) {
            
            // console.log('he')
            
            socket.emit('loadingMessage', savaChat)
            const user = await getUser(lastUser)
            if (user) {
                io.to(user.socketId).emit('sendigen', { userid, text })
                console.log('user is here...')
            } else {
                console.log('user is not here.....')
            }
        } else {

            console.error('error', error)
        }

    })





    // check your order the way.....
    socket.on('theWay', async (userid) => {


        const checkIn = await CheckInTheWay(userid)
        if (checkIn) {
            const user = getUser(userid)
            if (user) {

                io.to(user.socketId).emit('clientWay', checkIn)
            } else {

                console.log('not user some....')
            }
        }

    })


    // cancal driver order...
    socket.on('cancaldriver', async (dataid, userid) => {

        const cancal = await Concalcaltion(dataid, userid)
        if (cancal === 'Remove Order') {

            const user = getUser(userid)

            const checkIn = await CheckInTheWay(userid)


            user && io.to(user.socketId).emit('clientWay', checkIn)
            const dataAvailable = await CheckInOrder()
            dataAvailable && io.emit('available', dataAvailable)
        } else console.log('not cancal')

    })


    // disconnect users...
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUser', users)
        console.log('logout...')
    })



})

http.listen(process.env.PORT || 8000, () => {
    console.log(`Server Runig.....`)
})

















