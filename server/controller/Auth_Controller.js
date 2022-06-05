const Auth = require('../model/AuthUser')
const bcrypt = require('bcrypt')
const getToken = require('../Jwt/JwtSignl')
const Jwt = require('jsonwebtoken')
const { main } = require('../Jwt/smtp')




// POST
// Send data to Email
exports.DriverWork = async (req, res) => {

    try {

        if (req.body) {
            await main(req.body)
            return res.status(200).json({ message: req.body })

        }

        return res.status(200).json('Empty')


    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// add account bank
exports.AccountAdd = async (req, res) => {

    const {
        accountnumber,
        accountnowner,
        iban,

    } = req.body

    try {
        let user = await Auth.findOne({ _id: req.user._id })
        if (user) {

            user.accountB.accountnumber = accountnumber
            user.accountB.accountnowner = accountnowner
            user.accountB.iban = iban

            const newSaveUser = await user.save()
            return res.status(200).json({ message: 'success' })
        } else {
            return res.status(404).json({ message: 'not' })
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}





// checked user is here
// POST // 
exports.CheckEdUser = async (req, res) => {

    const { email } = req.body
    try {

        let user = await Auth.findOne({ email })
        if (user) return res.status(200).json({ message: 'ok' })


        return res.status(200).json({ message: 'no' })


    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}

// change Password : /// 
// POST ///
exports.changePassword = async (req, res) => {

    const _id = req.params.id

    try {
        const Linkforget = Jwt.verify(_id, process.env.SCRIPT_TOKEN)

        if (Linkforget) {
            let user = await Auth.findOne({ _id: Linkforget.id })
            if (user) {
                const hasPassword = await bcrypt.hash(req.body.password, 10)

                user.password = hasPassword
                user.likeforget = undefined

                const newSave = await user.save()

                return res.json({
                    message: 'Change a password',
                    newSave
                })

            }
            else res.json({
                message: 'not'
            })
        }


        return res.status(404).json({ message: 'token stlut' })

    } catch (error) {

        return res.status(404).json({ message: error.message })
    }




    // const { password } = req.body
    // try {

    //     let user = await Auth.findById({ _id: req.params.id })
    //     if (user) {





    //     }
    //     else return res.status(404).json({
    //         message: 'we do not have soma user Info...'
    //     })
    // } catch (error) {


    //     return res.status(404).json({
    //         message: error.message
    //     })
    // }
}


// PUT /
// forget Password

exports.forgetPassword = async (req, res) => {

    const { email } = req.body
    try {
        let user = await Auth.findOne({ email })
        if (!user) return res.status(200).json({ message: 'we dont have soma email' })

        const id = user._id
        const tokenLink = Jwt.sign({ id }, process.env.SCRIPT_TOKEN, {
            expiresIn: '5m'
        })

        user.likeforget = tokenLink

        const newSave = await user.save()
        await main(newSave)

        return res.status(200).json({
            message: 'check your email, thank you'
        })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }


}





// login in ..... first requires....
// POST /// 
exports.login = async (req, res) => {

    const { email, password } = req.body



    try {
        const user = await Auth.findOne({ email })
        if (!user) return res.status(404).json({
            message: `we have someEmail ${email}`
        })
        else {


            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(404).json({ message: `not match password...` })


            return res.json({
                token: getToken(user._id),
                data: {


                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    telephone: user.telephone,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    Adress: user.Adress,
                    driverlogin: user.driverlogin,
                    accountB: user?.accountB,
                    restaurantid: user?.restaurantid,
                    cartinfo: user.cartinfo,
                    driverStatus : user.driverStatus
                },

            })




        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}




// create User
// POST
exports.singup = async (req, res) => {

    const { firstname, telephone, lastname, email, password } = req.body




    // if (email.startsWith(" ") || email.endsWith(" ") ||
    //     username.startsWith(" ") || username.endsWith(" ") ||
    //     password.startsWith(" ") || password.endsWith(" ")
    // ) return res.status(404).json({ message: `Not Empty` })

    try {
        let user = await Auth.findOne({ email })
        if (user) return res.status(404).json({ message: `We have the same ${email} you can log in ` })
        const hasPassword = await bcrypt.hash(password, 10)
        user = new Auth({

            firstname,
            lastname,
            telephone,
            email,
            password: hasPassword
        })

        const newUser = await user.save()
        return res.json({
            token: getToken(newUser._id),
            data: {
                _id: newUser._id,
                firstname: newUser.firstname,
                lastname: newUser.lastname,
                telephone: newUser.telephone,
                email: newUser.email,
                isAdmin: newUser.isAdmin,
                Adress: newUser.Adress,
                accountB: newUser?.accountB,
                restaurantid: newUser?.restaurantid
            }

        })



    } catch (error) {

        return res.status(404).json({ message: error.message })
    }
}





// login with google  and Save .... 
// POST  
exports.GoogleLogin = async (req, res) => {

    const { email, firstname, googleId, lastname } = req.body

    try {
        const user = await Auth.findOne({ email })
        if (user) {

            return res.json({
                token: getToken(user._id),
                data: {
                    _id: user._id,
                    googleId: user.googleId,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    Adress: user.Adress,
                    accountB: user?.accountB,
                    cartinfo: user.cartinfo
                }
            })
        } else {

            let user = new Auth({
                email, firstname, googleId, lastname
            })


            const newSave = await user.save()

            return res.status(201).json({

                token: getToken(newSave._id),
                data: {
                    _id: newSave._id,
                    googleId: newSave.googleId,
                    firstname: newSave.firstname,
                    lastname: newSave.lastname,
                    email: newSave.email,
                    Adress: user.Adress
                }

            })


        }




    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// PUT
// ADD telefon number...
exports.AddTelefonNumber = async (req, res) => {

    const { telephone } = req.body
    try {
        let user = await Auth.findOne({ _id: req.user._id })


        user.telephone = telephone

        await user.save()

        if (user) return res.status(200).json({ message: 'ok' })

        return res.status(200).json({ message: 'not user...' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

// lists user .. 
// GET ///.....................
exports.ListUser = async (req, res) => {

    const pageSize = Number(5)

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i',
        },

    } : {}
    const page = Number(req.query.pageNumber) || 1

    let count = await Auth.countDocuments({ ...keyword })

    const result = {}

    if (page < count) {
        result.next = {
            page: page + 1,
        }

    }


    try {


        let user = await Auth.find({ ...keyword })
            .select('-password -Adress')
            .limit(pageSize)
            .skip(pageSize * (page - 1))
        if (user) {

            //  next()
            return res.status(200).json({
                LengthProduct: count,
                result,
                pageNumber: page,
                pages: Math.ceil(count / pageSize),
                product: user,
            })


        }

        return res.status(404).json({ message: 'we do not have Product...' })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }








}


// user id... 
exports.userId = async (req, res) => {
    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    try {

        let user = await Auth.findById({ _id: req.user._id }).select('-password')

        if (user) return res.status(200).json(user)
        else res.status(200).json({ message: 'we have not user id' })

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}




// chenge user and password... 
exports.ChangeUserName = async (req, res) => {
    // if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `ID ${req.params.id}` })
    const { firstname, lastname } = req.body
    try {
        // let user = await Auth.updateOne({ _id: req.params.id }, { username, email })
        let user = await Auth.findOne({ _id: req.user._id })
        if (user) {


            user.firstname = firstname
            user.lastname = lastname

            const newSave = await user.save()




            return res.status(201).json({ message: 'Ok' })
        } else {
            return res.status(201).json('not...')
        }

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}




// update Address..
exports.UpdateAdress = async (req, res) => {
    //if (!Object.isValid(req.params.id)) return res.status(404).json({ message: `not id ${req.params.id}` })
    const {
        addres,
        city,
        zipcode,
        work,
        homeNumber,
        ClassAddAddress,
    } = req.body
    //Adress

    try {
        let user = await Auth.findOne({ _id: req.user._id }).select('-password')
        if (user) {

            if (ClassAddAddress === true) {
                const addAdress = {
                    addres,
                    city,
                    zipcode,
                    work,
                    homeNumber,
                }
                user.Adress = addAdress
                await user.save()

                return res.status(201).json({ message: 'ok' })
            } else {

                user.Adress = {}
                await user.save()
                return res.status(201).json({ message: 'remove' })
            }


        } else return res.status(404).json({ message: 'not user id' })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}





// remove Adress... 
exports.RemoveMyAdress = async (req, res) => {

    try {
        let user = await Auth.findById({ _id: req.user._id })
        if (user) {


            user.Adress = {}
            const addSave = await user.save()
            return res.status(201).json(addSave)
        } else {
            return res.status(201).json({ message: 'we have not user id' })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}



// Admin remove all
// this is profile....
exports.RemoveUserid = async (req, res) => {
    // if(!Object.isValid(req.params.id)) return res.status(404).json({message : ` not id ${req.params.id}`})
    const { remove, addAmin } = req.body
    try {
        const user = await Auth.findOne(req.user._id)

        if (addAmin) {

            const newUser = await Auth.findOne({ _id: addAmin })

            if (newUser.isAdmin) {
                newUser.isAdmin = false

                await newUser.save()
                return res.status(201).json({ message: 'remove user Admin' })

            } else {
                newUser.isAdmin = true
                await newUser.save()
                return res.status(201).json({ message: '  user is  Admin now ' })

            }
        }

        if (remove) {

            let removeUser = await Auth.deleteOne({ _id: remove })


            return res.status(201).json({
                message: 'Remove user from List..',
                removeUser
            })
        }

        return res.status(200).json(user)

    } catch (error) {
        return res.status(400).json({
            message: error.message
        })
    }
}





// user change status
exports.driverChangeStatus = async (req, res) => {
    try {

        let user = await Auth.updateOne({ _id: req.user._id }, { $set: req.body })
        if (user) return res.status(200).json({
            message: 'sussfully',
            data: user
        })

        return res.status(404).json({ message: 'error' })
    } catch (error) {

        return res.status(400).json({
            message: error.message
        })
    }
}