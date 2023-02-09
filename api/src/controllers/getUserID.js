const { User, Membership, ShoppingCart, Order,Review } = require("../db");

const getUserID = async function (id) {
    if (id) {
        
        const user = await User.findOne({
            where: {
                id: id,
            },
            include: 
            [    { model: Review },
                 { model: Membership },
                 { model: ShoppingCart },
                 { model: Order }
            ]
        })
        if (user) {
            return user
        } else {
            return "User is not registered in the database"
        }
    }else{
         const allUsers = await User.findAll()
    return allUsers;
    }
   
}

module.exports = { getUserID }