const { Router } = require('express');
const { Membership } = require("../db");
const { deleteMemberships } = require ('../controllers/deleteMemberships');
const { getMembership } = require('../controllers/getMembership');
const { updateMembership } = require('../controllers/updateMembership');
const { assignMembership } = require('../controllers/assignMembership');

const router = Router();

router.get('/', async (req, res) => {
    try {
        let result = await Membership.findAll();
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//eliminar membresía
router.delete('/:id', async (req, res) => {
    
    try {
        const { id } = req.params

        let result = await deleteMemberships(id)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)

    }
})

//agregar membresia 
router.post('/', async (req, res) => {

    try {
        const { name, discount, price, description } = req.body;
        let result = await Membership.findOrCreate({
            where: {
                name: name,
                discount: discount,
                price: price,
                description: description
            },
        })
        res.status(200).send({ message: "Membership created" })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message)
    }
})


//traer membresia por id
router.get("/get/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let result = await getMembership(id);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});


                                             //actualizar membresia: esto hay que revisar en caso de q se
                                                //quiera cambiar de nombre o agregar otra membresía  
router.put('/:idMembership', async (req, res) => {
    try {
        const { idMembership } = req.params
        const { name, discount, price, description } = req.body;
        let result = await updateMembership(idMembership, name, discount, price, description)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// asignar membresia al usuario
router.put("/:userId/:membershipId", async (req, res) => {
  try {
    const { userId, membershipId } = req.params;

    let result = await assignMembership(userId, membershipId);
    res.status(200).send(result);
  } catch (error) {
    res.status(400).send(error.message);
  }
});



module.exports = router;