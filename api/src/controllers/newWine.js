const { Wine } = require("../db");

const newActivity = async function (name, price, volumen, grapes, quantity, stock, details, winerys, image, states, regions) {
  //Busco wine por name para saber si existe
//   grapesId?
  if (!name || !price || !volumen || !grapes || !quantity || !stock || !details || !winerys || !image || !states || !regions ) {
    throw new Error('Debe completar todos los campos requeridos')
  }
  const searchWine = await Wine.findOne({
    where: {
      name: name,
    },
  });
  // console.log(searchWine)
  // busco el pais que coincida con id
//   const grapesMatch = await Grapes.findAll({
//     where: {
//       id: grapesID,
//     },
//   });
  // console.log(grapesMatch)
//   if (grapesMatch.length === 0) {
//     throw new Error(`No se encuentra el país ${countryID} para agregar actividad`)
//   }
  // si no existe en la base de datos, crearla
  !volumen || !grapes || !quantity || !stock || !details || !winerys ||  !image || !states || !regions
  if (!searchWine) {
    const newWine = await Wine.create({
      name: name,
      price: price,
      volumen: volumen,

      grapes: grapes,
    //   ?
      quantity: quantity,
      stock: stock,
      details: details,
      winerys: winerys,
      image: image,
      states: states,
      regions: regions
    });
    //agrego la el vino a las cepas?
    // await newWine.addGrapes(grapesMatch);

    return `New box ${name} was created and added successfully`
  } else {
    // console.log(countrymatch)
    // const ActivityAdd = 
    await searchWine.addGrapes(grapesMatch);
    // return ActivityAdd;
    return `Box ${name} added successfully`
  }
}
module.exports = { newWine };