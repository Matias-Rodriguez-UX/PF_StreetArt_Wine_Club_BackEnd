const { Address  } = require("../db");

const createAddress = async function (reference, address, zipCode, telephone, userEmail, state, region ) {
  if (!address || !zipCode || !telephone) {
    throw new Error('You must complete address, zipCode and telephone')
  }

  const searchAddress = await Address.findOne({
    where: {
        address: address,
    },
  });   

    if (!searchAddress) {
        const newAddress = await Address.create({
            reference: reference,
            address: address,
            zipCode: zipCode,
            telephone: telephone,
            userEmail: userEmail,
            state: state,
            region: region
        });
    
    return `New address was created successfully`
  } else {
 
    return `This address  already exists: ${address}`
  }
}
module.exports = { createAddress };