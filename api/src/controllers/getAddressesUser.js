const { Address, User } = require("../db");

const getAddressesUser = async function (email) {
    if (email) {

        const addresses = await Address.findAll({
            where: {
                userEmail: email,
            },
            // include: 
            // [    { model: Review },
            //      { model: Membership },
            //      { model: ShoppingCart },
            //      { model: Order }
            // ]
        })
        if (addresses.length !== 0) {
            return addresses
        } else {
            return `the user ${email} has no registered addresses`
        }
    }else{
         const allAddress = await Address.findAll()
    return allAddress;
    }
   
}

module.exports = { getAddressesUser }