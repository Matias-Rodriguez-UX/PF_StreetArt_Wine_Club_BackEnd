const { Router } = require('express');
const { Type } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const types = await Type.findAll()
        res.status(200).send(types)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;