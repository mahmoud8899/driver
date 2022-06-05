const nodemailer = require("nodemailer")
const ejs = require('ejs')
const path = require('path')


exports.main = async (dataform) => {



    // console.log(dataform)
    var transporter = nodemailer.createTransport({
        host: process.env.USER_HOST,
        port: 587,
        auth: {
            user: process.env.USERNAME, 
            pass: process.env.USER_PASSWORD, 
        },
        tls: { rejectUnauthorized: false }
    });


    const checkIn = dataform.client ? 
    '/../views/myorder.ejs' : 
    dataform.work ? '/../views/work.ejs'  :'/../views/forgetpassword.ejs'
    const checnObject = dataform.client ? 'Confirm Order' : dataform.work ?  'Driver work' : 'Forget Password !'
    ejs.renderFile(__dirname + checkIn, { data: dataform }, function (err, data) {

     
      
        if (err) {
            console.log(err);
        } else {

            // console.log('..........>>>>>>................',dataform)
            var mainOptions = {
                from: process.env.USERNAME,
                to: process.env.USERNAME,
                subject: checnObject,
                html: data
            };
            // console.log("html data ======================>", mainOptions.html);
            transporter.sendMail(mainOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }
    });




















}







