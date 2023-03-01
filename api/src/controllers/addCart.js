const { Product, User, ShoppingCart, Order } = require("../db");

const addCart = async function (userId, totalPrice, quantity, email, productId) {

  if (email) {
    let order = await Order.findOne({ where: { userEmail: email, status: 'cart' } })
    let orderPayment = await Order.findOne({ where: { userEmail: email, status: 'processing payment' } })

    if (!order && !orderPayment) {
      let newOrder = await Order.create({
        totalPrice: 0,
      })
      await newOrder.setUser(email)
      if (productId) {
        let product = await Product.findOne({ where: { id: productId } })
        if (product.stock >= quantity) {
          await ShoppingCart.create({
            totalPrice,
            quantity,
            userEmail: email,
            orderId: newOrder.id,
            productId: productId
          }, {
            where: {
              orderId: newOrder.id,
            }
          })
        } else {
          return "There is not enough stock for the purchase"
        }
      }
      return "Cart created "
    } else if (order && !orderPayment) {
      if (productId) {
        let product = await Product.findOne({ where: { id: productId } })
        if (product.stock >= quantity) {
          await ShoppingCart.create({
            totalPrice,
            quantity,
            userEmail: email,
            orderId: order.id,
            productId: productId
          }, {
            where: {
              orderId: order.id,
            }
          })

          return "Added product "

        } else {
          return "There is not enough stock for the purchase"
        }
      } else {
        return 'the product is not found in the database'
      }
    } else {
      return "You already have a cart pending payment"
    }
  } else {
    return 'You must enter a user'
  }
}
//    

module.exports = { addCart }

