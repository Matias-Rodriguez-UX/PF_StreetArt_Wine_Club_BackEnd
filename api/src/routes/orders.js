const express = require("express");
const router = express.Router();
const { Product, Order, ShoppingCart, User, Address } = require("../db.js");
const { getOrderId } = require("../controllers/getOrderId");
const { changeOrder } = require("../controllers/changeOrder");
const { localStorageCart } = require("../controllers/localStorageCart");
const { updateOrderById } = require("../controllers/updateOrder.js");

// ruta que retorna todas las ordenes(solo dar acceso Admin)
router.get("/", async (req, res) => {
  try {

    let allOrders = await Order.findAll({
      include: { model: User, as: "user" },
    });
    res.status(200).send(allOrders);
  } catch (error) {
    res.status(400).send("no purchase orders created");
  }
});

//get order del user
router.get("/byuser", async (req, res) => {

  try {
    const { email } = req.query;

    let result = await Order.findAll({
      where: {
        userEmail: email,
      },
      include: { model: Product },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// retornar orden por id
router.get("/:id", async (req, res) => {
  try {

    const { id } = req.params;
    let result = await getOrderId(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// crear ruta para modificar una Orden
router.put("/checkout/", async (req, res) => {
  try {
    const orderId = req.query.orderId || null;
    const addressId = req.query.addressId || null;

    const {
      status,
      email,
      reference,
      address,
      zipCode,
      telephone,
      state,
      region,
      discount
    } = req.body;

    if (
      addressId === null &&
      email &&
      reference &&
      address &&
      zipCode &&
      telephone &&
      state &&
      region
    ) {
      var newAddress = await Address.findOrCreate({
        where: {
          reference: reference,
          address: address,
          zipCode: zipCode,
          telephone: telephone,
          userEmail: email,
          state: state,
          region: region,
        },
      });
      console.log('en ruta primera opcion', status, 'status', email, 'email', orderId, 'orderId', addressId, 'addressId', newAddress, 'newAddress', discount, 'discount')
      let result = await changeOrder(
        status,
        email,
        orderId,
        addressId,
        newAddress,
        discount
      );
      res.status(200).send(result);
    } else {
      console.log('en ruta segunda opcion', status, 'status', email, 'email', orderId, 'orderId', addressId, 'addressId', newAddress, 'newAddress', discount, 'discount')
      let result = await changeOrder(status, email, orderId, addressId,  newAddress, discount);
      res.status(200).send(result);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/backToCart/:orderId", async (req, res) => {
  try {
    const { orderId } = req.params;
    let result = await Order.update(
      {
        status: "cart",
      },
      {
        where: {
          id: orderId,
        },
      }
    );
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/localStorageCart", async (req, res) => {
  try {
    const { arrayProducts, email } = req.body;
    let result = await localStorageCart(arrayProducts, email);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/update", async (req, res) => {
  try {
    const orderId = req.query.orderId || null;
    const addressId = req.query.addressId || null;
    const { status } = req.body;

    let result = await updateOrderById(orderId, status, addressId);
    console.log(result);
    res.status(200).send(result);
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
});

module.exports = router;
