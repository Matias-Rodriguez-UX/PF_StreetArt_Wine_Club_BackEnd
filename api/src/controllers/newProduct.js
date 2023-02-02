const { Product, Grape, State, Region, Type  } = require("../db");

const newProduct = async function (name, price, image, volumen, quantity, category, stock, details, grapesName, stateName, regionName, typeName) {
  //Busco wine por name para saber si existe
//   grapesId?
  if (!name || !price || !image || !volumen || !quantity || !category || !stock || !details || !winerys || !grapesName || !stateName || !regionName || !typeName ) {
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

//   if (grapesMatch.length === 0) {
//     throw new Error(`No se encuentra el país ${countryID} para agregar actividad`)
//   }
  // si no existe en la base de datos, crearla
  if (!searchProduct) {
    const newWine = await Wine.create({
      name: name,
      price: price,
      image: image,
      volumen: volumen,
      quantity: quantity,
      category: category,
      stock: stock,
      details: details,
      winery: winerys,
    });

    //agrego la el vino a las cepas y otras tablas
    await newWine.addGrape(grapesMatch);
    await newWine.addState(stateMatch);
    await newWine.addRegion(regionMatch);
    await newWine.addType(typeMatch);

    return `New box ${name} was created and added successfully`
  } else {
 
    return `Box ${name} already exists`
  }
}
module.exports = { newProduct };