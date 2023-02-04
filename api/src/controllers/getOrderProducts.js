const { Product } = require("../db");

const getOrderProducts = async function(order, value){
    Product.findAll({
        order:[ value, order ]
    })
}

module.exports = {getOrderProducts}