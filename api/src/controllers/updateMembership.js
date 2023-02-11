const { Membership, User } = require("../db");

const updateMembership = async function( idMembership, name, discount, price){

    const update = Membership.update(
		{ name: name, 
          discount: discount,
          price: price },
		{ where: { id: idMembership} },
	)

    if (update){
        return 'Your membership was successfully updated'
    }
}

module.exports = {updateMembership}