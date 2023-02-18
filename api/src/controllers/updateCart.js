const { where } = require("sequelize");
const { Product, User, ShoppingCart, Order } = require("../db");

const updateCart = async function (userId, totalPrice, quantity, email, productId) {
    let product = await Product.findOne({ where: { id: productId } })

    if (email) {
        let order = await Order.findOne({ where: { userEmail: email, status: 'cart' } })
        let cart = await ShoppingCart.findOne({
            where: { orderId: order.id, productId: productId }
        })
        if (product.stock >= quantity) {
            //modificacion para descontar stock cuando agrega al carrito
            // newStock = stockRevert - quantity
            // await Product.update(
            //                 {
            //                     stock: newStock,
            //                 }, {
            //                 where: {
            //                     id: productId,
            //                 }
            //             }
            //             )
            // console.log(product.stock)
            let cartUpdate = await ShoppingCart.update({
                totalPrice,
                quantity,
            },
                { where: { orderId: order.id, productId: productId } })
            if (cartUpdate) return "Product updated"

        } else {
            return "There is not enough stock for the purchase"
        }
    } else {
        return 'You must enter a user'
    }
}


module.exports = { updateCart }

