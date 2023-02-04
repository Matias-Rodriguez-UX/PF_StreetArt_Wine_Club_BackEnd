const { Product } = require("../db");

const getOrderProducts = async function(order, value){
    
   let orders = await Product.findAll({
        order:[[ value, order ]]
    })
    return orders
}

module.exports = {getOrderProducts}