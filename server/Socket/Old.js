

    // socket.on('sendM', async ({ chatid, userid, text, lastUser, image }) => {
    //     //  console.log('coming',chatid, userid, text, lastUser, image )
    //     const { error, savaChat } = await SendMessageUserMessage(chatid, userid, text, image)
    //     if (!error) {

    //         // console.log('he')

    //         socket.emit('loadingMessage', savaChat)
    //         const user = await getUser(lastUser)
    //         if (user) {
    //             io.to(user.socketId).emit('sendigen', { userid, text })
    //             console.log('user is here...')
    //         } else {
    //             console.log('user is not here.....')
    //         }
    //     } else {

    //         console.error('error', error)
    //     }

    // })





    // // check your order the way.....
    // socket.on('theWay', async (userid) => {


    //     const checkIn = await CheckInTheWay(userid)
    //     if (checkIn) {
    //         const user = getUser(userid)
    //         if (user) {

    //             io.to(user.socketId).emit('clientWay', checkIn)
    //         } else {

    //             console.log('not user some....')
    //         }
    //     }

    // })


    // // cancal driver order...
    // socket.on('cancaldriver', async (dataid, userid) => {

    //     const cancal = await Concalcaltion(dataid, userid)
    //     if (cancal === 'Remove Order') {

    //         const user = getUser(userid)

    //         const checkIn = await CheckInTheWay(userid)


    //         user && io.to(user.socketId).emit('clientWay', checkIn)
    //         const dataAvailable = await CheckInOrder()
    //         dataAvailable && io.emit('available', dataAvailable)
    //     } else console.log('not cancal')

    // })
    // // views all orders. to user..
    // socket.on('Userprofile', async (userid) => {

    //     const userorder = await ViewsAllDriversOrder(userid)
    //     if (userorder) {

    //         // console.log(userorder)

    //         io.emit('userorder', userorder)
    //     } else {

    //         return console.log('err')
    //     }


    // })



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




