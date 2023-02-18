const nodemailer = require ('nodemailer')
const handlebars = require("handlebars");
const path = require('path');
const fs = require('fs');



const emailUser = function(email, fullname){
    
    const filePath = path.join(__dirname, '../utils/welcomeUser.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = { user: fullname };
    const htmlToSend = template(replacements);



const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'artstreetwineclub@gmail.com',
        pass: 'rokkcjdppianhcnb'
        // user: 'mvaleriabzn@gmail.com',
        // pass: 'zhwuiqooqpegqdkl'
    },
    
});
transporter.verify().then (() => {
    console.log ('Ready for send emails')
})






const mailOptions = {
from: 'artstreetwineclub@gmail.com',
to: email,
subject:  `Welcome ${fullname} your email was registered 📧✔`,
html: htmlToSend,
headers: { 'x-myheader': 'test header' }
}

//console.log(mailOptions)

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        // res.status(500).send(error.message)
        console.log(error)
    } else {
        console.log('email enviado')
        // res.status(200).jsonp(req.body)
    }
})

}

module.exports = {emailUser}