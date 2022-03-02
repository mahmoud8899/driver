const DiscountModel = require('../model/discountCode')




// create discount code... 
exports.CreateDiscount = async (req, res) => {


    const sop = () => {
        var text = ""
        var possible = "ABCDEFGHIJKLMN-O-PQRS-TU-V-W-X-YZa-b3-c-d4ef-g-67hij-0dk-1-2-l-m-6n8o-0-p---q-r-s-t=uvwx9yz0123456789";

        for (var x = 0; x < 5; x++) {
            x++
            for (var i = 0; i < 10; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));

            }

        }

        return text

    }


    var finx = []

    for (var x = 0; x < 10; x++) {

        finx.push(sop(x))
    }



    let discount = await DiscountModel.create({
        discountCode: finx
    })


    await res.json(discount)





}



// show all discountCode. ..
exports.showDiscount = async (req, res) => {

    try {
        let discount = await DiscountModel.find({})
        if (discount) return res.status(200).json(discount)
        else return res.status(200).json('not have...')
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// remove one discount 
exports.removeItemDiscount = async (req, res, removeClientCode) => {




    let cheickin = removeClientCode ? removeClientCode : null

    console.log('trdsxcxxvcv', cheickin)

    try {
        let discount = await DiscountModel.findOne({})
        if (discount) {


            let checkInDisCount = discount.discountCode.filter((x) => x.toString() !== cheickin.toString())

            if (checkInDisCount) {

                discount.discountCode = checkInDisCount


                await discount.save()


                if(req.body.re) return console.log('hello')

                // res.json({ message: 'remove.' })
            } else {

                return res.status(404).json({
                    message: 'not have....'
                })
            }



        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// check in if we have code true ...
exports.CheckInCode = async (req, res) => {

    const { checkinCode } = req.body

    try {
        let discount = await DiscountModel.findOne({ discountCode: checkinCode })
        if (discount) return res.json({
            message: 'Success',
            discount : '20'
        })
        else {
            return res.json({
                message: 'The discount code is not work.'
            })
        }
    }
    catch (error) {
        return res.status(404)
            .json({
                message: error.message
            })
    }
}