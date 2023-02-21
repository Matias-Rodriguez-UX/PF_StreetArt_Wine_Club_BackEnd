const { User, Membership, ShoppingCart, Order,Review, Product } = require("../db");
const nodemailer = require ('nodemailer')
const Handlebars = require("handlebars");
const path = require('path');
const fs = require('fs');



const emailUser = async function(email, fullname){

   
    
    const filePath = path.join(__dirname, '../utils/welcomeUser.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
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
        console.log('email bienvenida enviado')
        // res.status(200).jsonp(req.body)
    }
})

}


const purchaseConfirmation = async function(email, orderSelectId){

    const orderSelect = await Order.findOne(
        {
            where: {
                id: orderSelectId
            },
            include: 
            [   
                 { model: Product },
                 { model: User }
            ]
        }
    )
 const products = orderSelect.products
 const user = await User.findOne({
    where: {
        email: email,
    },
    include: 
    [    { model: Review },
         { model: Membership },
         { model: ShoppingCart },
         { model: Order }
    ]
})

console.log(user)
console.log("user . membership",user.membership)
console.log("nombre de membresia",user.membership.name)

if(user.membership){
  var finalPrice = await orderSelect.totalPrice - (orderSelect.totalPrice * user.membership.discount * 0.01) 
  var membership = user.membership
}else{
    var finalPrice = orderSelect.totalPrice
    var membership = "no membership"
}

  
    const filePath = path.join(__dirname, '../utils/purchaseConfirmation.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const replacements = { orderSelect, products,user, email, finalPrice, membership };
    const htmlToSend = template(replacements, {
        allowProtoPropertiesByDefault: true
      });



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
subject:  `Purchase Made ✔`,
html: htmlToSend,
headers: { 'x-myheader': 'test header' }
}

//console.log(mailOptions)

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        // res.status(500).send(error.message)
        console.log(error)
    } else {
        console.log('email compra enviado')
        // res.status(200).jsonp(req.body)
    }
})

}



module.exports = {emailUser, purchaseConfirmation}