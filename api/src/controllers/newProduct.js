const { Product, Grape, State, Region, Type  } = require("../db");

const newProduct = async function (name, price, image, volume, quantity, category, stock, details, winery, grapesName, stateName, regionName, typeName) {
  //Busco wine por name para saber si existe
//   grapesId?
  if (!name || !price || !image || !volume || !quantity || !category || !stock || !details || !winery || !grapesName || !stateName || !regionName || !typeName ) {
    throw new Error('You must complete all fields')
  }
  const searchProduct = await Product.findOne({
    where: {
      name: name,
    },
  });
  // console.log(searchWine)
  const grapesMatch = await Grape.findOrCreate({
    where: {
      name: grapesName,
    },
  });
  // console.log(grapesMatch)
  const stateMatch = await State.findOrCreate({
    where: {
      name: stateName,
    },
  });
  const regionMatch = await Region.findOrCreate({
    where: {
      name: regionName,
    },
  });
  const typeMatch = await Type.findOrCreate({
    where: {
      name: typeName,
    },
  });

  // si no existe en la base de datos, crearla
  if (!searchProduct) {
    const newProduct = await Product.create({
      name: name,
      price: price,
      image: image,
      volume: volume,
      quantity: quantity,
      category: category,
      stock: stock,
      details: details,
      winery: winery,
      rating:0,
      review:""
    });

    //agrego la el vino a las cepas y otras tablas
    await newProduct.addGrape(grapesMatch);
    await newProduct.addState(stateMatch);
    await newProduct.addRegion(regionMatch);
    await newProduct.addType(typeMatch);

    return `New box ${name} was created and added successfully`
  } else {
 
    return `${name} box already exists`
  }
}
module.exports = { newProduct };