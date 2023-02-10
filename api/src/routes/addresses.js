const { Router  } = require('express');
const { Address, User, State, Region } = require("../db");
const { createAddress} = require('../controllers/createAddress');
const { getAddressesUser } = require('../controllers/getAddressesUser');
// const { deleteUser } = require('../controllers/deleteUser');
const { updateAddress } = require('../controllers/updateAddress');
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

router.post('/', async (req, res) => {
    try {
        const { reference, address, zipCode, telephone, userEmail, stateId, regionId} = req.body;

        let result = await createAddress(reference, address, zipCode, telephone, userEmail, stateId, regionId )
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
        const { reference, address, zipCode, telephone, userEmail, stateId, regionId } = req.body;
// console.log(req.body)
        let result = await updateAddress(idAddress, reference, address, zipCode, telephone, userEmail, stateId, regionId )
        res.status(200).send(result)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;