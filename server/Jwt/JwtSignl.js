
const Jwt = require('jsonwebtoken')




const getToken = (id)=>{


    return Jwt.sign({id}, process.env.SCRIPT_TOKEN,{
        expiresIn : '3d'
    })
}

module.exports = getToken