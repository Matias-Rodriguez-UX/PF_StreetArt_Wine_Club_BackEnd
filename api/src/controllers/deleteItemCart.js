const { ShoppingCart , User } = require("../db");

const deleteItemCart = async function(email,idProduct){
console.log(email)
const delItem = await ShoppingCart.destroy({
    where: {
        userEmail: email,
        productId : idProduct
    }
})
console.log(delItem)
if(delItem){
    return `Product ${idProduct} was removed from ${email} cart`
}else{
    return "Product not found"
}
}

module.exports = {deleteItemCart}