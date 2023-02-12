const { Product, Grape, State, Region, Type  } = require("../db");

const updateProduct = async function (id, name, price, image, volume, quantity, stock, details, winery, grapes, state, regions, types) {
    if (!id) {
        throw new Error('You must enter an id value')
    }
    const searchProduct = await Product.findOne({
        where: {
            id: id,
        },
    });
    const grapesMatch = await Grape.findAll({
        where: {
          name: grapes,
        },
      });
    
      const statesMatch = await State.findAll({
        where: {
          name: state,
        },
      });
     
      const typesMatch = await Type.findAll({
        where: {
          name: types,
        },
      });
      // console.log(typesMatch)
      const regionsMatch = await Region.findAll({
        where: {
          name: regions,
        },
      });
    if (!searchProduct) {
        throw new Error(`Cannot find product ${id} to update`)
    } else{
        await Product.update(
            {
                name: name,
                price: price,
                image: image,
                volume: volume,
                quantity: quantity,
                stock: stock,
                details: details,
                winery: winery,
                rating:"",
                review:""
            }, {
            where: {
                id: id,
            }
        }
        )
        await searchProduct.setGrapes(grapesMatch);
        await searchProduct.setStates(statesMatch);
        await searchProduct.setRegions(regionsMatch);
        await searchProduct.setTypes(typesMatch);
        // return ActivityAdd;
        return `Product ${name} updated successfully`
    } 
}
module.exports = { updateProduct };