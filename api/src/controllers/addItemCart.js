const { Product, User, ShoppingCart, Order } = require("../db");

const addItemCart = async function(totalPrice, cantidad, email, productId, orderNumber){
//console.log(cantidad)
//console.log(productId)
   if(productId <= 0 || cantidad <= 0) 
   throw new Error('You must choose a number of products')


   const searchProduct = await Product.findAll({
    where: {
      id: productId,
    },
  });

  console.log(searchProduct)
  if (searchProduct){

      const newItem = await ShoppingCart.create({
           quantity: cantidad,
           productId: productId,
           totalPrice: totalPrice,
           userEmail: email,
           //orderNumber: orderNumber,
    
       })

        //Order.SetShoppingCart(orderNumber)
        //await newItem.addProducts(searchProduct)
       if(newItem){
           'The product was added'
       }
       
  } else {
    return 'the product no existe'
  }
    
    
    //console.log(newItem)
}

module.exports = {addItemCart}