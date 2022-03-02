const MessageChat = require('../model/MessageChat')
const AuthModel = require('../model/AuthUser')



// view message....
const ViewChat = async (userid) => {


    try {
        let chat = await MessageChat.find({ users: userid })
            .populate({ path: 'users', select: '_id username email driverlogin' })
            .populate({ path: 'message.sender', select: '_id username email driverlogin' })
            .select('-message')
        if (chat.length > 0) {
            return (chat)
        } else {

            
            let createUser = await AuthModel.findOne({ isAdmin: 'true' })

            chat = new MessageChat({
                users: [userid, createUser._id],
                lastMessage: ''
            })
            await chat.save()
            return 'create a chat..'
        }
    } catch (error) {

        return { 'error': error }
    }


}



// create Chat 
const CreateChatWithServer = async (userid, serverid) => {
    try {
        let chat = await MessageChat.findOne({ users: [userid, serverid] })

        if (!chat) {
            chat = new MessageChat({
                users: [userid, serverid],
                lastMessage: ''
            })
            await chat.save()
            return ['Create Chat With Service.']
        } else {
            return ['error']
        }

    } catch (error) {
        return { 'message': error }
    }

}



// chat id 
const ViewMessageChat = async (chatid) => {

    try {
        let chat = await MessageChat.findOne({ _id: chatid })
            .populate({ path: 'message.sender', select: '_id username email driverlogin' })
        if (chat) return (chat)
        else return ['error', 'not we have chat']

    } catch (error) {

        return [error]
    }

}





// send message = .. /.
const SendMessageUserMessage = async (chatid, userid, text, image) => {
    try {
        let chat = await MessageChat.findById({ _id: chatid })
        if (chat) {
            const addMessage = {
                sender: userid,
                text,
                date: Date.now()
            }

            chat.message.push(addMessage)
            chat.lastMessage = text
           const savaChat = await chat.save()
            return {savaChat}

        } else {
            return ['error: id is wrong.']
        }

    } catch (error) {
        return { error: 'not Have Chat...' }
    }
}


// check in only admin 

module.exports = {

    ViewChat,
    CreateChatWithServer,
    ViewMessageChat,
    SendMessageUserMessage,
}