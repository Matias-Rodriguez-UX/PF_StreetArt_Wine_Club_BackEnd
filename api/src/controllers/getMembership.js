const { User, Membership } = require("../db");


const getMembership = async function(id){
  
    const member = Membership.findAll({
        where: {
            id: id,	
        },
     
    })
    return member;
}




module.exports = {getMembership}