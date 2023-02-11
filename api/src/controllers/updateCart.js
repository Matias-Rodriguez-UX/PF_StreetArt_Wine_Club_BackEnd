const { Product, User, ShoppingCart, Order } = require("../db");

const updateCart = async function(userId, totalPrice, quantity, email, productId){
//console.log(quantity)
//console.log(productId)

// if (email) {
//               let order = await Order.findOne({ where: { userEmail: email, status: 'cart' } })
//               console.log(order)
//                       if (!order) {
//                           let newOrder = await Order.create({
//                               totalPrice: 0,
//                           })
//                           console.log(newOrder)
//                      await newOrder.setUser(email)
//                       if (productId) {
//                           await ShoppingCart.create({
//                             totalPrice,
//                             quantity,
//                             userEmail: email,
//                               orderId: newOrder.id,
//                               productId: productId
//                           })}
//                          return "order created "
//           } else {
//             if (productId) {
//               await ShoppingCart.put({
//                 totalPrice,
//                 quantity,
//                   orderId: order.id,
//                   productId: productId
//               })
              
//             return "cart created "
//             }

//           }
//         }else {
//               return 'You must enter a user'
//           }
      }
  //    

module.exports = {updateCart}