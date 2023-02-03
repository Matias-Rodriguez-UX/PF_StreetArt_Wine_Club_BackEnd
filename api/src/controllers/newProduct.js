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
  const grapesMatch =  await grapesName.map(g => Grape.findOrCreate({
    where: {
      name: g,
    },
  }))
console.log(grapesMatch)
// console.log(grapesCreated)
  const statesMatch = await stateName.map(s => State.findOrCreate({
    where: {
      name: s,
    },
  }))
  
  // console.log(statesMatch)
  const regionsMatch= await regionName.map(r => Region.findOrCreate({
    where: {
      name: r,
    },
  }))
  // console.log(regionMatch)
  const typesMatch= await typeName.map(t => Type.findOrCreate({
    where: {
      name: t,
    },
  }))
  // console.log(typeMatch)
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
      rating:"",
      review:""
    });
    
    //agrego la el vino a las cepas y otras tablas
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