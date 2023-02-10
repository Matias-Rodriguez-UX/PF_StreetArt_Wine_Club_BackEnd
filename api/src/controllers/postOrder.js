const { Order, User } = require("../db");

const newOrder = async function(orderNumber, date, totalPrice, status, email ){
    
if(!orderNumber || !orderNumber || !totalPrice){
    throw new Error('Fill in the fields orderNumber, date and totalPrice')
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


//  orderNumber: {
//         type: DataTypes.STRING,
//         primaryKey: true,
//       },
//       date: {
//         type: DataTypes.DATEONLY,
//         defaultValue: DataTypes.NOW
//       },
//       totalPrice: {
//         type: DataTypes.FLOAT,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.ENUM('processing payment', 'processing shipping', 'shipped', 'delivered', 'cancelled'),
//         defaultValue: 'processing payment',
//         allowNull: false,
//       },