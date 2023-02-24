const express = require("express");
const router = express.Router();
const { Product, Order, ShoppingCart, User } = require("../db.js");
const { getOrderId } = require("../controllers/getOrderId");
const { changeOrder } = require("../controllers/changeOrder");
const { localStorageCart } = require("../controllers/localStorageCart");
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
//get order del user
router.get("/", async (req, res) => {
  try {
    const { email } = req.query;
    let result = await Order.findAll({
      where: {
        userEmail: email,
      },
    });
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// crear ruta para modificar una Orden

router.put("/checkout/", async (req, res) => {
  try {
    const { orderId } = req.query;
    console.log(orderId);
    const { status, email } = req.body;
    let result = await changeOrder(status, email, orderId);
    res.status(200).send(result);
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

module.exports = router;
