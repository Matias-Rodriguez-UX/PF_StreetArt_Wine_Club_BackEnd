const { Router } = require('express');
const { User , Memberships, ShoppingCarts, Orders, Review  } = require("../db");
const { createUser} = require('../controllers/createUser');
const { deleteUser } = require('../controllers/deleteUser');
const { getUserID } = require('../controllers/getUserID');
const { updateUser } = require('../controllers/updateUser');
const { addItemCart } = require ('../controllers/addItemCart');
const router = Router();

//Traer usuario por ID

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        let result = await getUserID(id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//traer todos los usuarios
router.get('/', async (req, res) => {
    try {
        let result = await User.findAll();
        
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// crear usuario
router.post('/', async (req, res) => {
    try {
        const { email, role, fullname, profile, avatar} = req.body;
console.log(req.body)
        let result = await createUser(email, role, fullname, profile, avatar )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//eliminar permanentemente usuario
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        let result = await deleteUser(id)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)

    }
})

//modificar datos del usuario
router.put('/', async (req, res) => {
    try {
        const { id, email, rol, fullname, profile, avatar,status } = req.body;

        let result = await updateUser(id, email, rol, fullname, profile, avatar, status )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})




//Agregar item al carrito
router.post('/:id/cart', async (req,res)=>{
    const { id } = req.params
    const { totalPrice, cantidad, email, productId, orderNumber} = req.body

    console.log(req.body)
    
    try {
        let result = await addItemCart( totalPrice, cantidad, email, productId, orderNumber)
        res.status(200).send(result)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// // Vaciar el carrito
// router.delete('/:id/cart', async (req,res)=>{
// try {
//     const {id} = req.params
//     let result = await deleteItem(id)
//     res.status(200).send(result)
// } catch (error) {
//     res.status(400).send(error.message)
// }
// })

// //Actualizar el carrito
// router.put('/:id/cart', async (req, res) => {
//     try {
//         const { id } = req.params
//         const { }  = req.body;

//         let result = await updateItemCart()
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })

// //Traer 
// router.get('/:id/cart', async (req, res) => {
//     try {
//         const { id } = req.params;
//         let result = await getCart(id)
//         res.status(200).send(result)
//     } catch (error) {
//         res.status(400).send(error.message)
//     }
// })





module.exports = router;