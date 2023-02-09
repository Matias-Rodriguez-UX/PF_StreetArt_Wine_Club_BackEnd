const { Router } = require('express');
const { Region } = require("../db");

const router = Router();

router.get('/', async (req, res) => {
    try {
        const regions = await Region.findAll()
        res.status(200).send(regions)
    } catch (error) {
        res.status(400).send(error.message)
    }
})


module.exports = router;