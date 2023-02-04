const { Product, Grape, State, Region, Type  } = require("../db");

const newProduct = async function (name, price, image, volume, quantity, stock, details, winery, grapesName, stateName, regionName, typeName) {

  if (!name || !price || !image || !volume || !quantity || !stock || !details || !winery || !grapesName || !stateName || !regionName || !typeName ) {
    throw new Error('You must complete all fields')
  }
  const searchProduct = await Product.findOne({
    where: {
      name: name,
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
  // console.log(regionsMatch)
  
  if (!searchProduct) {
    const newProduct = await Product.create({
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
    });
    
    await newProduct.setGrapes(grapesMatch);
    await newProduct.setStates(statesMatch);
    await newProduct.setRegions(regionsMatch);
    await newProduct.setTypes(typesMatch);

    return `New box ${name} was created and added successfully`
  } else {
 
    return `${name} box already exists`
  }
}
module.exports = { newProduct };