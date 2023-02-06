const { Router } = require('express');
const { Grape } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const grapes = await Grape.findAll()
        console.log(grapes)
        res.status(200).send(grapes)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;