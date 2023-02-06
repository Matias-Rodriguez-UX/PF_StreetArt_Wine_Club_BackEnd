const { Router } = require('express');
const { State } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const states = await State.findAll()
        res.status(200).send(states)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;