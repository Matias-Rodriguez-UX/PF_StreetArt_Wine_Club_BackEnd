const express = require("express");
const router = express.Router();
const { Product, Order, ShoppingCart, User } = require('../db.js');
const { getOrderId } = require('../controllers/getOrderId');


    // ruta que retorna todas las ordenes(solo dar acceso Admin)

router.get('/', async (req, res) => {
    try {
        let allOrders = await Order.findAll({ include: { model: User, as: 'user' } })
        res.status(200).send(allOrders)
    } catch (error) {
        res.status(400).send('no purchase orders created')
    }
})

    // retornar orden por id
    router.get('/:id', async (req, res) => {
        try {
            const { id } = req.params;
            let result = await getOrderId(id)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message)
        }
    })

    


router.post('/checkout', async (req, res, ) => {
    try {
        const { orderNumber, date, totalPrice, status, email } = req.body;
        let result = await postOrder( orderNumber, date, totalPrice, status, email  )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
  
    
})
// crear ruta para modificar una Orden


module.exports = router;