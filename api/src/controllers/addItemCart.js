const { Product, User, ShoppingCart, Order } = require("../db");

const addItemCart = async function(totalPrice, quantity, email, productId, orderNumber){
//console.log(quantity)
//console.log(productId)
   if(productId <= 0 || quantity <= 0) 
   throw new Error('You must choose a number of products')


   const searchProduct = await Product.findAll({
    where: {
      id: productId,
    },
  });

  //console.log(searchProduct)
  if (!searchProduct){
    return 'the product no existe'

  } else {

    const newItem = await ShoppingCart.create({
         quantity: quantity,
         productId: productId,
         totalPrice: totalPrice,
         userEmail: email,
         //orderNumber: orderNumber,
  
     })
     if(newItem) return 'The product was added successfully'
  }




        //Order.SetShoppingCart(orderNumber)
        //await newItem.addProducts(searchProduct)
      //  if(newItem){
      //      'The product was added'
      //  }
       

    
    //console.log(newItem)
}

module.exports = {addItemCart}