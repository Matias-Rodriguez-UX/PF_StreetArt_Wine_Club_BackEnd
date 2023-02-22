const { Router } = require('express');
const { Membership } = require("../db");
const { deleteMemberships } = require ('../controllers/deleteMemberships')

const router = Router();

router.get('/', async (req, res) => {
    try {
        let result = await Membership.findAll();
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    
    try {
        const { id } = req.params

        let result = await deleteMemberships(id)
        res.status(200).send(result)

    } catch (error) {
        res.status(400).send(error.message)

    }
})



module.exports = router;