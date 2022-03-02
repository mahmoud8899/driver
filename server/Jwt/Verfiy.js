const Auth = require('../model/AuthUser')
const Jwt = require('jsonwebtoken')


const verify = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const ud = Jwt.verify(token, process.env.SCRIPT_TOKEN)
            req.user = await Auth.findById(ud.id).select('-password')

            next()

        } catch (error) {

           // console.error(error)
            return res.status(404).json({ message: 'token failed' })
        }

    }

    if (!token) return res.status(404).json({ message: 'Not authorized' })
}


module.exports = verify