// const { where } = require("sequelize");
const { Product, User, ShoppingCart, Order } = require("../db");

const addCart = async function (userId, totalPrice, quantity, email, productId) {

  if (email) {
    let order = await Order.findOne({ where: { userEmail: email, status: 'cart' } })
    // console.log(order)
    if (!order) {
      let newOrder = await Order.create({
        totalPrice: 0,
      })
      // console.log(newOrder)
      await newOrder.setUser(email)

      if (productId) {

        let product = await Product.findOne({ where: { id: productId } })
        // console.log(product.stock)
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
          //                        
        } else {
          return "There is not enough stock for the purchase"
        }
      }

      return "Cart created "
    } else {
      if (productId) {
        let product = await Product.findOne({ where: { id: productId } })
        // console.log(product.stock)
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
    }
  } else {
    return 'You must enter a user'
  }
}
  //    

module.exports = {addCart}

