const axios = require('axios');
// const { Product, Grape, State, Region, Type  } = require("./db");
const { newProduct } = require('./controllers/newProduct')

const LoadingProducts = async function (req, res) {
  try {
    const ProductsLoading = await axios.get('http://demo8521051.mockable.io/products');

    const Products = await ProductsLoading.data.map((p) => {
      return {
        name: p.name,
        price: p.price,
        volume: p.volume,
        image: p.image,
        quantity: p.quantity,
        stock: p.stock,
        details: p.details,
        winery: p.winerys,
        grapes:p.grapes,
        state: p.state,
        regions: p.regions,
        types:p.types
      };
    });
    Products.forEach(async (e) => {
        
        let  {name, price, image, volume, quantity, stock, details, winery, grapes, state, regions, types} = e
        await newProduct(name, price, image, volume, quantity, stock, details, winery, grapes, state, regions, types)
        //console.log(e.regions)
}
    );
    
    console.log('Database Products loaded successfully')
  } catch (error) {
    console.log(error)
    res.send(error);

  }
}
module.exports = { LoadingProducts }