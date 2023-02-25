const express = require("express");
const router = express.Router();
const { Product, Order, ShoppingCart, User, Address } = require("../db.js");
const { getOrderId } = require("../controllers/getOrderId");
const { changeOrder } = require("../controllers/changeOrder");
const {localStorageCart} = require("../controllers/localStorageCart");
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

router.put('/checkout/', async (req, res, ) => {
    try {
      const orderId = req.query.orderId|| null
      const addressId = req.query.addressId|| null
        console.log(orderId, "y", addressId, "EN RUTA")
        const { status, email,   reference, Newaddress, zipCode, telephone, state, region } = req.body;
        // console.log(req.body)
        if(email && reference && Newaddress && zipCode && telephone && state && region)
       { var newAddress = await Address.create({
          reference: reference,
          address: Newaddress,
          zipCode: zipCode,
          telephone: telephone,
          userEmail: email,
          state: state,
          region: region
      });
      console.log(newAddress)
      let result = await changeOrder( status, email, orderId, addressId, newAddress )
        res.status(200).send(result)
    
    }else{
      let result = await changeOrder( status, email, orderId, addressId)
        res.status(200).send(result)
    }
  

      
      
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

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
    const arrayProducts = req.body;
    console.log(arrayProducts)
    let result = await localStorageCart(arrayProducts)
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
