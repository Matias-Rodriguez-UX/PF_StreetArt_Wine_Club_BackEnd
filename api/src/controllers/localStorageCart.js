const { Product, User, ShoppingCart, Order } = require("../db");

const localStorageCart = async function (carts, email) {
  // userId, totalPrice, quantity, email, productId ==> en un arrays de productos
  console.log("en localstorage", carts);
  // const email = await carts[0].email
  if (email) {
    let order = await Order.findOne({
      where: { userEmail: email, status: "cart" },
    });
    let orderPayment = await Order.findOne({
      where: { userEmail: email, status: "processing payment" },
    });
    if (!order && !orderPayment) {
      if (carts.length) {
        let newOrder = await Order.create({
          totalPrice: 0,
        });
        await newOrder.setUser(email);

        await carts.forEach(async (element) => {
          const { userId, price, quantity, cartQuantity, id } = element;
          let product = await Product.findOne({ where: { id: id } });
          if (product.stock >= quantity) {
            await ShoppingCart.create(
              {
                totalPrice: price * cartQuantity,
                quantity: cartQuantity,
                userEmail: email,
                orderId: newOrder.id,
                productId: id,
              },
              {
                where: {
                  orderId: newOrder.id,
                },
              }
            );
          } else {
            console.log("there is not enough stock for your shopping cart");
          }
        });
        return "Cart created ";
      } else {
        return "no cart in localstorage";
      }
    } else {
      return "You already have a cart";
    }
  } else {
    return "You must enter a user";
  }
};

module.exports = { localStorageCart };
