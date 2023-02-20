const { User, ShoppingCart, Order, Product } = require("../db");

const getOrderId = async function (id) {
    if (id) {
        const order = await Order.findOne({
            where: {
                id: id,
            },
            include: 
            [    
                 { model: User },
                 { model: Product },
            ]
        })
        if (order) {
            return order
        } else {
            return "Order is not registered in the database"
        }
    }else{
         const orders = await Order.findAll()
    return orders;
    }
   
}

module.exports = { getOrderId }