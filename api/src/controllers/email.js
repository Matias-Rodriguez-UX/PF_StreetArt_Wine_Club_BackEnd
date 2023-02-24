const { User, Membership, ShoppingCart, Order,Review, Product, Address } = require("../db");
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

// console.log(user)
// console.log("user . membership",user.memberships)
// console.log("nombre de membresia",user.memberships[0].name)


if(user.memberships.length){
    var discounts = user.memberships.map(e=>e.discount)
    var maxdiscount = Math.max(discounts)
  var finalPrice = await orderSelect.totalPrice - (orderSelect.totalPrice * maxdiscount * 0.01) 
//   var membership = await user.memberships.map(e=>e.name)
//   var membershipNames = await membership.join('-')
    var membership = `${maxdiscount}% off`
  console.log("soy membership",membership)
// console.log("soy membership con join",membershipNames)
if(user.memberships[0].name==='not member'){var shipping = 1000}
}else{
    var finalPrice = orderSelect.totalPrice
    var membership = "no membership"
}

  
    const filePath = path.join(__dirname, '../utils/purchaseConfirmation.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const replacements = { orderSelect, products,user, email, finalPrice, membership, shipping };
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

const emailNewsletter = async function(email){

   
    
    const filePath = path.join(__dirname, '../utils/newsletter.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const replacements = {}
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
subject:  `Welcome to our newsletter ✔`,
html: htmlToSend,
headers: { 'x-myheader': 'test header' }
}

//console.log(mailOptions)

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        // res.status(500).send(error.message)
        console.log(error)
    } else {
        console.log('newsletter enviado')
        // res.status(200).jsonp(req.body)
    }
})

}

const orderShipped = async function(email, orderId){

    const orderSelect = await Order.findOne(
        {
            where: {
                id: orderId
            },
            include: 
            [   
                 { model: Product },
                 { model: User },
                 { model: Address}
            ]
        }
    )

console.log('SOY LA ORDEN', orderSelect)

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

// console.log(user)
// console.log("user . membership",user.memberships)
// console.log("nombre de membresia",user.memberships[0].name)


if(user.memberships.length){
    var discounts = user.memberships.map(e=>e.discount)
    var maxdiscount = Math.max(discounts)
  var finalPrice = await orderSelect.totalPrice - (orderSelect.totalPrice * maxdiscount * 0.01) 
//   var membership = await user.memberships.map(e=>e.name)
//   var membershipNames = await membership.join('-')S
    var membership = `${maxdiscount}% off`
  //console.log("soy membership",membership)
// console.log("soy membership con join",membershipNames)
if(user.memberships[0].name==='not member'){var shipping = 1000}
}else{
    var finalPrice = orderSelect.totalPrice
    var membership = "no membership"
}

var address = await orderSelect.address.address
  
    const filePath = path.join(__dirname, '../utils/orderShipped.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = Handlebars.compile(source);
    const replacements = { orderSelect, products,user, email, finalPrice, membership, shipping, address };
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
subject:  `order shipped ✔`,
html: htmlToSend,
headers: { 'x-myheader': 'test header' }
}

//console.log(mailOptions)

transporter.sendMail(mailOptions, (error, info)=>{
    if(error){
        // res.status(500).send(error.message)
        console.log(error)
    } else {
        console.log('email orden despachada enviado')
        // res.status(200).jsonp(req.body)
    }
})

}









module.exports = {emailUser, purchaseConfirmation, emailNewsletter, orderShipped}