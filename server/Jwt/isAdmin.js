

const  Admin =  (req,res,next)=>{

    if(req.user && req.user.isAdmin) {
        next()
    }else{
        return res.status(404).json({message : 'You are not responsible..'})
    }
}


module.exports = Admin