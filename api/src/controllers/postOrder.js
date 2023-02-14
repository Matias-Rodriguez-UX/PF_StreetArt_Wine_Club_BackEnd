const { Order, User } = require("../db");

const newOrder = async function(orderNumber, date, totalPrice, status, email ){
    
if( !totalPrice){
    throw new Error('Fill in the fields totalPrice')
}

    const newOrder = await Order.create({
        orderNumber: orderNumber,
        date: date,
        totalPrice: totalPrice,
        status: status,
        userEmail: email
    })
    if(newOrder){
        return `The order ${orderNumber} was created successfully`
    }
}

module.exports = {newOrder}


