const { where, Op } = require("sequelize");
const { Product, User, ShoppingCart, Order, Address } = require("../db");
const { emailUser, purchaseConfirmation, orderShipped } = require("./email");

const changeOrder = async function (status, email, orderId, addressId, newAddress, discount) {
  // 'cart', 'processing payment', 'processing shipping', 'shipped', 'delivered', 'cancelled'
  console.log('en controlador', status, 'status', email, 'email', orderId, 'orderId', addressId, 'addressId', newAddress, 'newAddress', discount, 'discount')
  const user = await User.findOne({
    where: {
      email: email,
    },
  });

  if (orderId === null) {
    if (status === "processing payment") {
      const orderSelect = await Order.findOne({
        where: {
          userEmail: email,
          status: "cart",
        },
      });

      await Order.update(
        {
          status: status,
        },
        {
          where: {
            userEmail: email,
            status: "cart",
          },
        }
      );
      //devuelve la orden con el precio actualizado, sumando los precios de los productos en el carrito
      let orderUp = await Order.findOne({ where: { id: orderSelect.id } });
      return orderUp;
    }
    if (status === "processing shipping") {
      let addressUpdate = await newAddress ? newAddress[0].id : addressId

      const orderSelect = await Order.findOne({
        where: {
          userEmail: email,
          status: "processing payment",
        },
      });
      const orderSelectId = await orderSelect.id;

      const products = await ShoppingCart.findAll({
        attributes: ["productId", "quantity"],
        where: {
          userEmail: email,
          orderId: orderSelect.id,
        },
      });
      const sumOfPrices = await ShoppingCart.sum("totalPrice", {
        where: {
          userEmail: email,
          orderId: orderSelect.id,
          totalPrice: {
            [Op.ne]: null, // Opcional: Para asegurarte que el precio no es nulo
          },
        },
      });

      await products.forEach(async (element) => {
        let prodSelect = await Product.findOne({
          where: {
            id: element.productId,
          },
        }); //Si envio que cambie  al estado pagado debo restar los productos del stock
        if (prodSelect.stock >= element.quantity) {
          let newStock = prodSelect.stock - element.quantity;
          await Product.update(
            {
              stock: newStock,
            },
            {
              where: {
                id: element.productId,
              },
            }
          );
        } else {
          `the quantity of the product ${prodSelect.name} in the stock is not enough`;
        }
      });
      const updated = await Order.update(
        {
          totalPrice: sumOfPrices - (sumOfPrices * (discount / 100)),
          status: status,
          userEmail: email,
          addressId: addressUpdate,
        },
        {
          where: {
            userEmail: email,
            status: "processing payment",
          },
        }
      );
      //envio de mail confirmando la compra
        await purchaseConfirmation(email, orderSelectId);
      return updated;
    }
  } else if (orderId) {
    const searchOrder = await Order.findOne({
      where: {
        id: orderId,
      },
    });

    //si el estado es shipped debe cambiar solo el status
    if (status === "shipped") {
      const updated = await Order.update(
        {
          status: status,
        },
        {
          where: {
            id: orderId,
          },
        }
      );

      //envia mail de compra realizada

        await orderShipped(email, orderId)
      return `The order ${orderId} was updated successfully`;
    }

    //si el estado es delivered debe cambiar solo el status
    if (status === "delivered") {
      const updated = await Order.update(
        {
          status: status,
          userEmail: email,
        },
        {
          where: {
            id: orderId,
          },
        }
      );
      return updated;
    }
    return `The order ${orderId} was updated successfully`;
  }
};

module.exports = { changeOrder };
