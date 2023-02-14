const { Router } = require('express');
const { Membership } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        let result = await Membership.findAll();

        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})





module.exports = router;