const { ShoppingCart , User } = require("../db");

const deleteItemCart = async function(idCart){

const delItem = ShoppingCart.destroy({
    where: {
    
        id : idCart
    }
})

if(delItem){
    return 'The cart was successfully removed'
}

}

module.exports = {deleteItemCart}