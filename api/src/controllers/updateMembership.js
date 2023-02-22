const { Membership, User } = require("../db");

const updateMembership = async function( idMembership, name, discount, price, description){

    const update = await Membership.update(
		{ name: name, 
          discount: discount,
          price: price,
          description:description },
		{ where: { id: idMembership} },
	)

    if (update){
        return 'Your membership was successfully updated'
    }
}

module.exports = {updateMembership}