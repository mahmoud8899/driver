
const isDriver = (req, res,next) =>{

    if(req.user && req.user.driverlogin){

        return next()
    }else{
 
        return res.status(404).json({
            message : 'Your are not driver...'
        })
    }
}


module.exports = isDriver