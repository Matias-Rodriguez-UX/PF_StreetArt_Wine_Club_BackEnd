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
    const { totalPrice, quantity, userEmail, productId, orderNumber} = req.body

    console.log(req.body)
    
    try {
        let result = await addItemCart( totalPrice, quantity, userEmail, productId, orderNumber)
        res.status(200).send(result)
        
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// server
//     .route("/:userId/cart")
//     /* ------------------------------------------------------------------------------- */
//     //S38:Crear Ruta para agregar Item al Carrito
//     /* ------------------------------------------------------------------------------- */
//     .post(authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
//         const { productId, price, quantity } = req.body.product;
//         const { userId } = req.params
//         let id
//         if (userId) {
//             Order.findOne({ where: { userId: userId, status: 'carrito' } })
//                 .then(order => {
//                     if (!order) {
//                         return Order.create({
//                             status: 'carrito'
//                         })
//                     }
//                     return order
//                 })
//                 .then(order => {
//                     return order.setUser(userId)
//                 })
//                 .then((order) => {


//                     if (productId) {
//                         return OrderList.create({
//                             price,
//                             quantity,
//                             orderId: order.id,
//                             productId: productId
//                         })

//                     }
//                     return order;

//                 })
//                 .then((order) => {
//                     return res.status(200).json(order)
//                 })
//                 .catch((err) => {
//                     return res.status(400).json(err)
//                 })

//         }
//         else {
//             return res.status(200).json('ingresa un usuario')
//         }

//     })



//     // modificar cantidad de producto en el carrito

//     .put(authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
//         const id = req.params.userId
//         const { productId, quantity, price } = req.body
//         Order.findOne(
//             {
//                 where: { userId: id, status: 'carrito' }
//             })
//             .then((carrito) => {
//                 return OrderList.findOne({
//                     where: { orderId: carrito.id, productId: productId }
//                 })
//             })
//             .then((producto) => {
//                 producto.quantity = quantity;
//                 producto.price = price;
//                 return producto.save();
//             })
//             .then((cambio) => {
//                 return res.json(cambio)
//             })
//     })
//     /* ------------------------------------------------------------------------------- */
//     //S40:Crear Ruta para vaciar el carrito
//     /* ------------------------------------------------------------------------------- */

//     .delete(authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
//         const id = req.params.userId;


//         Order.destroy({
//             where: { userId: id, status: 'carrito' },
//         })
//             .then(() => {
//                 return res.status(200).send("Carrito eliminado");
//             })
//             .catch(err => res.send(err));
//     })
//     /* ------------------------------------------------------------------------------- */
//     // S39 : Crear Ruta que retorne todos los items del Carrito
//     /* ------------------------------------------------------------------------------- */
//     .get(authentication.passport.authenticate('jwt', { session: false }), (req, res) => {
//         const id = req.params.userId;
//         let carrito
//         Order.findOne(
//             {
//                 where: { userId: id, status: 'carrito' },
//                 include: [{ model: Product, as: 'products' }, { model: User, as: 'user' }]
//             })
//             .then((cart) => {
//                 if (cart) {
//                     carrito = cart
//                     return OrderList.findAll({
//                         where: { orderId: carrito.id },
//                     })
//                 }
//                 else {
//                     return res.status(200).json([])
//                 }
//             })
//             .then((orderList) => {
//                 let obj = {
//                     ordenId: carrito.id,
//                     products: carrito.products,
//                     orderList
//                 }
//                 return res.status(200).send(obj)
//             })
//             .catch(err => res.status(400).json(err))

//     })

// /* ------------------------------------------------------------------------------- */
// //  Ruta que elimine un producto del carrito
// /* ------------------------------------------------------------------------------- */
// server
//     .route("/:userId/cart/:productId")
//     .delete((req, res) => {
//         const { orderId } = req.body;
//         const { productId } = req.params
//         OrderList.destroy({
//             where: { orderId: orderId, productId: productId }
//         }).then(respon => res.status(200).json(respon))
//             .catch(err => res.send(err))
//     })

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