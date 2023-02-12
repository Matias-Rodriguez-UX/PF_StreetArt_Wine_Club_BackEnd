
const { Router } = require('express');
const { User, Product, Membership, ShoppingCart, Order, Review } = require("../db");
const { createUser } = require('../controllers/createUser');
const { deleteUser } = require('../controllers/deleteUser');
const { getUserID } = require('../controllers/getUserID');
const { updateUser } = require('../controllers/updateUser');
const { deleteItemCart } = require('../controllers/deleteItemCart');
const { addCart } = require('../controllers/addCart');
const { updateCart } = require('../controllers/updateCart');
const { assignMembership } = require ('../controllers/assignMembership')
const { getMembership } = require ('../controllers/getMembership')
const { updateMembership } = require ('../controllers/updateMembership')
const { authenticator } = require ('../controllers/authenticator')


const router = Router();

//Traer usuario por ID
router.post('/auth', async (req, res) => {
    try {
        const { email, token, role, fullname } = req.body;
        let result = await authenticator(email, token, role, fullname)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


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
        const { email, role, fullname, profile, avatar } = req.body;
        console.log(req.body)
        let result = await createUser(email, role, fullname, profile, avatar)
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
        const { id, email, rol, fullname, profile, avatar, status } = req.body;

        let result = await updateUser(id, email, rol, fullname, profile, avatar, status)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})




//Agregar item al carrito
router.post('/:userId/cart', async (req, res) => {
    const { userId } = req.params
    const { totalPrice, quantity, email, productId } = req.body
    try {
        let result = await addCart(userId, totalPrice, quantity, email, productId)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)
    }
})


router.put('/:userId/cart', async (req, res) => {
    const { userId } = req.params
    const { totalPrice, quantity, email, productId } = req.body
    try {
        let result = await updateCart(userId, totalPrice, quantity, email, productId)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

// ruta para eliminar el carrito completo pasando por query el email del usuario
router.delete('/:userId/cart', async (req, res) => {
    const { userId } = req.params
    let usuario = await User.findOne({ where: { id: userId } })
    try {
        const result = await Order.destroy({
            where: { userEmail: usuario.email, status: 'cart' }
        })
        if (result) {
            res.status(200).send({ message: 'Cart delete' })
        } else { res.status(200).send({ message: 'Cannot be deleted' }) }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Ruta para traer todos los productos del carrito u order por id
//
router.get('/:userId/cart', async (req, res) => {
    const { userId } = req.params
    let usuario = await User.findOne({ where: { id: userId } })
    // console.log(usuario.email)
    try {
        const result = await Order.findOne({
            where: { userEmail: usuario.email, status: 'cart' },
            include: [{ model: Product, as: 'products' }, { model: User, as: 'user' }]
        })
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)
    }
})

// Eiminar carrito de un usuario
router.delete('/:id/cart/:idCart', async (req, res) => {
    try {
        const { idCart } = req.params
        let result = await deleteItemCart(idCart)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//agregar membresia 
router.post('/membership', async(req,res)=>{

    try{
        const { name, discount, price } = req.body;
        let result = await Membership.findOrCreate({
            where: {
                name : name,
                discount : discount,
                price: price
            },
        })
        res.status(200).send({message:"Membership created"})
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//traer membresia por id 

router.get('/membership/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let result = await getMembership(id)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//actualizar membresia 

router.put('/membership/:idMembership', async (req, res) => {
    try {
        const {  idMembership } = req.params
        const { name, discount, price } = req.body;
        let result = await updateMembership(idMembership, name, discount, price)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// asignar membresia al usuario
router.put('/:userId/membership/:membershipId', async (req, res) => {
    try {
        const { userId, membershipId } = req.params

        let result = await assignMembership(userId, membershipId)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;