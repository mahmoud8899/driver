const ChatModel = require('../model/MessageChat')
const ObjectID = require('mongoose').Types.ObjectId
const AuthModel  = require('../model/AuthUser')
// create Chat
// POST
// create chat....
exports.createChat = async (req, res) => {

    try {
        let chat = await ChatModel.findOne({ users: [req.body.userId, req.body.lastId] })

        if (!chat) {
            chat = new ChatModel({
                users: [req.body.userId, req.body.lastId],
                lastMessage: ''
            })
            const saveChat = await chat.save()
            return res.status(201).json(saveChat)
        } else {
            return res.status(404).json({ message: 'We have some Chat...' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}


// view chat....>
exports.ViewChat = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `not user id${req.params.userId}` })

    let chat = await ChatModel.find({ users: req.params.id })
        .populate({ path: 'users', select: '_id username email driverlogin' })
        .populate({ path: 'message.sender', select: '_id username email driverlogin' })
        .select('-message')
    if (chat.length > 0) {
        return res.status(202).json(chat)
    } else {
        
        let createUser = await AuthModel.findOne({ isAdmin: 'true' })

        chat = new ChatModel({
            users: [req.params.id, createUser._id],
            lastMessage: ''
        })
      const newCreate =   await chat.save()
        return  res.status(201).json({
             message : 'create',
            data : newCreate
        })
    }

}




// create Message 
exports.CreateMessage = async (req, res) => {

    if (!ObjectID.isValid(req.params.id)) return res.status(404).json({ message: `Not Id ${req.params.id}` })
    const { sender, text } = req.body
    try {
        let chat = await ChatModel.findById({ _id: req.params.id })
        if (chat) {
            const addMessage = {
                sender: req.user._id,
                text,
                date: Date.now()
            }

            chat.message.push(addMessage)
            chat.lastMessage = text
            const saveChat = await chat.save()
            return res.json(saveChat)

        } else {
            return res.json({ message: 'We have not id .....' })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }


}

// view all chats...
exports.AllChat = async (req, res) => {


    let chat = await ChatModel.findOne({ _id: req.params.id })
    if (chat) return res.json(chat)
    else return res.status(404).json({ message: 'not chat..' })



}
