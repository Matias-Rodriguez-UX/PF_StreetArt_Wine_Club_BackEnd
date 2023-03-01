const { User, ShoppingCart, Order, Product, Address } = require("../db");

const updateOrderById = async function (orderId, status, addressId) {

    const searchOrder = await Order.findOne({
        where: {
            id: orderId,
        },
    });

    if (searchOrder) {

        if (addressId !== null) {
            const searchAddress = await Address.findOne({
                where: {
                    id: addressId,
                },
            });

            const update = await Order.update(
                {
                    status: status,
                    addressId: searchAddress.id,
                    id: orderId
                },
                {
                    where: {
                        status: searchOrder.status,
                        addressId: searchOrder.addressId,
                        id: searchOrder.id,
                    }
                },
            )

            if (update) {
                return 'Your order status and address was successfully updated'
            }

        } else {
            const updateStatus = await Order.update(
                {
                    status: status,
                },
                {
                    where: {
                        status: searchOrder.status,
                        id: orderId
                    }
                },
            )

            if (updateStatus) {
                return 'Your order status was successfully updated'
            }

        }

    }

    return 'No se encontro una orden con ese id'

}

module.exports = { updateOrderById }