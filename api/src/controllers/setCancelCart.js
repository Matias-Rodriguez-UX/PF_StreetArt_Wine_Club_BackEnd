const { Order } = require("../db");


const setCancelCart = async function(idCart ){
    
    if(!idCart){
        throw new Error('The fields are required')
    }
    const updateCart = await Order.update({
        status: 'cancelled',
      }, {
        where: {
          id: idCart,
        }
      });
        if(updateCart){
            return 'The cart was updated successfully'
        }
    }
    
    module.exports = {setCancelCart}