const { Router } = require('express');
const { newProduct } = require('../controllers/newProduct')
const { productById } = require('../controllers/getProductById')
// const { deleteProduct } = require('../controllers/deleteProduct')
// const { updateProduct } = require('../controllers/updateProduct')
// const { Wine } = require("../db");
const router= Router();

router.post('/', async (req, res)=>{
    try {
    const { name, price, image, volume, quantity, category, stock, details, winery, grapesName, stateName, regionName, typeName} = req.body;
    let result = await newProduct( name, price, image, volume, quantity, category, stock, details, winery, grapesName, stateName, regionName, typeName )
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
    const productId = req.params.idWine
    try {
        let result = await productById(productId);
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
});

// router.put('/:id', async (req, res)=>{
//     try {
//         const id = req.params.id
//         const { name, price, image, volumen, quantity, category, stock, details, grapesID, statesID, regionsID, typeID } = req.body;
//     let result = await updateWine(id, name, price, image, volumen, quantity, category, stock, details, grapesID, statesID, regionsID, typeID)
//     res.status(200).send(result)
// } catch (error) {
//     res.status(400).send(error.message)
// }
// })

// router.delete('/:id', async (req, res)=>{
//     try {
//         const id = req.params.id
//     let result = await deleteWine(id)
//     res.status(200).send(result)
// } catch (error) {
//     res.status(400).send(error.message)
// }
// })  

module.exports = router;