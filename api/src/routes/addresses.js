const { Router  } = require('express');
const { Address, User, State, Region } = require("../db");
const { createAddress} = require('../controllers/createAddress');
const { getAddressesUser } = require('../controllers/getAddressesUser');
// const { deleteUser } = require('../controllers/deleteUser');
const { updateAddress } = require('../controllers/updateAddress');
const axios  = require('axios');
const router = Router();

router.get('/', async (req, res) => {
    try {
        const { email } = req.query;
        let result = await getAddressesUser(email)
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

//crear direccion de entrega de usuario
router.post('/', async (req, res) => {
    try {
        const { reference, address, zipCode, telephone, userEmail, state, region} = req.body;

        let result = await createAddress(reference, address, zipCode, telephone, userEmail, state, region )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/:idAddress', async (req, res) => {
    const { idAddress } = req.params
    try {
const deleteAddress = await Address.destroy({
    where: {
        id: idAddress
    }})
        res.status(200).send("The address was removed successfully")
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.put('/:idAddress', async (req, res) => {
    try {
        const { idAddress } = req.params
        const { reference, address, zipCode, telephone, userEmail, state, region } = req.body;
// console.log(req.body)
        let result = await updateAddress(idAddress, reference, address, zipCode, telephone, userEmail, state, region )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/regions', async (req, res) => {
    try {
        
    const allRegions = await axios.get('https://apis.datos.gob.ar/georef/api/municipios?max=1814');

    const Regions = allRegions.data.municipios.map((e) => {
       return {
         id: e.id,
         name: e.nombre,
        //state: provincia.id
       };
     });

        res.status(200).send(Regions)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;