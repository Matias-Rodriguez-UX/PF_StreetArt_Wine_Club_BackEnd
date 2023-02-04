const axios = require('axios');
const { Product } = require('./db');
const { newProduct } = require('./controllers/newProduct')

const LoadingProducts = async function (req, res) {
  try {
    const ProductsLoading = await axios.get('http://demo8521051.mockable.io/products');
            
    
    console.log(ProductsLoading.data)
    // console.log(ProductsLoading.data)
    
    ProductsLoading.data.map(product=> newProduct(product))


  
    // const Products = ProductsLoading.data.map((p) => {
    //   return {
    //     name: p.name,
    //     price: p.price,
    //     volume: p.volume,
    //     image: p.image,
    //     quantity: p.quantity,
    //     stock: p.stock,
    //     details: p.details,
    //     winery: p.winerys
    //   };
    // });
    // Countries.forEach(async (e) => {
    //   await Country.findOrCreate({
    //     where: {
    //       name: e.name,
    //       id: e.id,
    //       flag_img: e.flag_img,
    //       continent: e.continent,
    //       region: e.region,
    //       capital: e.capital,
    //       subregion: e.subregion,
    //       area: e.area,
    //       population: e.population,
    //     },
    //   });
    // });

    console.log('Database loaded successfully')
  } catch (error) {
    console.log(error)
    res.send(error);
  }
}
module.exports = { LoadingProducts }