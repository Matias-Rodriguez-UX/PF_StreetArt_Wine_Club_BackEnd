const { Membership, User } = require("../db");

const deleteMemberships = async function(id){

const deleteMember = Membership.destroy({
    where: {
    
        id: id
    }
})

if(deleteMember){
    return 'The membership was successfully removed'
}

}

module.exports = {deleteMemberships}