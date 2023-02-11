const { Router, } = require('express');
const { User,  Membership, ShoppingCart, Order, Review  } = require("../db");
const { createUser} = require('../controllers/createUser');
const { deleteUser } = require('../controllers/deleteUser');
const { getUserID } = require('../controllers/getUserID');
const { updateUser } = require('../controllers/updateUser');
const { assignMembership } = require ('../controllers/assignMembership')
const { getMembership } = require ('../controllers/getMembership')
const { updateMembership } = require ('../controllers/updateMembership')

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

//modificar membresia 

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
        res.status(200).send()
    } catch (error) {
        res.status(400).send(error.message)
    }
})






module.exports = router;