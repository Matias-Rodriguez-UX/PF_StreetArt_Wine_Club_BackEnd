const { Order, User } = require("../db");
const { emailUser } = require("./email");

const changeOrder = async function( status, email ){

const user =  await User.findOne({
    where:{
       email: email 
    }
})

    const updated = await Order.update({
        status: status,
        userEmail: email},
        {where: {
            userEmail: email,
            status: 'cart',
        }}
    )


    if(status === 'processing shipping'){
        emailUser(email, user.fullname)
    }
    if(updated){
        return `The order was updated successfully`
    }


}

module.exports = {changeOrder}


