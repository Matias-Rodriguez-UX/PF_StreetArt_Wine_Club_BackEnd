const { Address  } = require("../db");

const updateAddress = async function (idAddress, reference, address, zipCode, telephone, userEmail, state, region ) {
  if (!address || !zipCode || !telephone || !userEmail || !state) {
    throw new Error('You must complete address, zipCode, Email and telephone')
  }

  const searchAddress = await Address.findOne({
    where: {
        id: idAddress,
    },
  });   
console.log(searchAddress)

if (searchAddress) {
    let addressUpdate = await Address.update({
        reference: reference,
        address: address,
        zipCode: zipCode,
        telephone: telephone,
        userEmail: userEmail,
        state: state,
        region: region
    }, {
        where: {
        id: idAddress,
    }});
    
    return `The address was successfully updated`
  } else {
 
    return `This address not exists: ${address}`
  }
}
module.exports = { updateAddress };