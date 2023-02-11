const { where } = require("sequelize");
const { Product, User, ShoppingCart, Order } = require("../db");

const updateCart = async function (userId, totalPrice, quantity, email, productId) {

    if (email) {
        let order = await Order.findOne({ where: { userEmail: email, status: 'cart' } })
        let cart = await ShoppingCart.findOne({
            where: { orderId: order.id, productId: productId }
        })

        let cartUpdate = await ShoppingCart.update({
            totalPrice,
            quantity,
        },
            { where: { orderId: order.id, productId: productId } })

        if (cartUpdate) return "Producto modificado"
    }
}


module.exports = {updateCart}

