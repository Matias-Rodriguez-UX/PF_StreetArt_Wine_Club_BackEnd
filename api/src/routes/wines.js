const { Router } = require('express');
const { newWine } = require('../controllers/newWine')
const { wineById } = require('../controllers/wineById')
const { deleteWine } = require('../controllers/deleteWine')
const { updateWine } = require('../controllers/updateWine')
// const { Wine } = require("../db");
const router= Router();

router.post('/', async (req, res)=>{
    try {
    const { name, price, volumen, grapes, quantity, stock, details, winerys, image, states, regions } = req.body;
    let result = await newWine(name, price, volumen, grapes, quantity, stock, details, winerys, image, states, regions)
    res.status(200).send({result})
} catch (error) {
    res.status(400).send(error.message)
}
})  

router.get('/', async (req, res) => {
    try {
        let { name } = req.query;
        const result = await getWine(name);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.get('/:idWine', async (req, res) => {
    const wineId = req.params.idWine
    try {
        let result = await wineById(wineId);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

router.put('/:id', async (req, res)=>{
    try {
        const id = req.params.id
        const { name, price, volumen, grapes, quantity, stock, details, winerys, image, states, regions } = req.body;
    let result = await updateWine(id, name, price, volumen, grapes, quantity, stock, details, winerys, image, states, regions)
    res.status(200).send(result)
} catch (error) {
    res.status(400).send(error.message)
}
})

router.delete('/:id', async (req, res)=>{
    try {
        const id = req.params.id
    let result = await deleteWine(id)
    res.status(200).send(result)
} catch (error) {
    res.status(400).send(error.message)
}
})  

module.exports = router;