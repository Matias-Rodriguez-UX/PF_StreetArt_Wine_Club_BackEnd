const { Product, Grape, State, Region, Type  } = require("../db");

const updateActivity = async function (id, name, price, image, volume, quantity, category, stock, details, winery, grapesName, stateName, regionName, typeName) {
    //Busco la actividad por name para saber si existe
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
          name: grapesName,
        },
      });
    
      const statesMatch = await State.findAll({
        where: {
          name: stateName,
        },
      });
     
      const typesMatch = await Type.findAll({
        where: {
          name: typeName,
        },
      });
      // console.log(typesMatch)
      const regionsMatch = await Region.findAll({
        where: {
          name: regionName,
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
                category: category,
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
module.exports = { updateActivity };