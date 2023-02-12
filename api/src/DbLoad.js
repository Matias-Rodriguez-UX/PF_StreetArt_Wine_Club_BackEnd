const axios = require('axios');
const { State, Grape, Region, Type } = require('./db')

const LoadingDb = async function (req, res) {
  try {
    const allStates = await axios.get('https://apis.datos.gob.ar/georef/api/provincias');
    
    const States = allStates.data.provincias.map((e) => {
      return {
        id: e.id,
        name: e.nombre
      };
    });
    States.forEach(async (e) => {
      await State.findOrCreate({
        where: {
          name: e.name,
          id: e.id,
        },
      });
    });

    // const allRegions = await axios.get('https://apis.datos.gob.ar/georef/api/municipios?max=1814');

    // const Regions = allRegions.data.municipios.map((e) => {
    //   return {
    //     id: e.id,
    //     name: e.nombre,
    //     // state: provincia.id
    //   };
    // });
    // http://demo8521051.mockable.io/regions creada por Mati Regiones mas frecuentes
    
    
    const allRegions = await axios.get ('http://demo8521051.mockable.io/regions')
    const regions = allRegions.data;
    var Regiones =[]
    regions.forEach(region => {
      for (let i = 0; i < region.state.regions.length; i++) {
    Regiones.push(region.state.regions[i].name)
   } 
   });
    
    
    Regiones.forEach(async(e)=>{
        await Region.findOrCreate({
          where: {
            name: e
          }
        })
      })
  











    const allGrapes = await axios.get('http://demo8521051.mockable.io/grape');

    const Grapes = allGrapes.data.map((e) => {
      return {
        name: e.name
      };
    });
    Grapes.forEach(async (e) => {
      await Grape.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });

    const allTypes = await axios.get('http://demo8521051.mockable.io/types');

    const Types = allTypes.data.map((e) => {
      return {
        name: e.name
      };
    });
    Types.forEach(async (e) => {
      await Type.findOrCreate({
        where: {
          name: e.name,
        },
      });
    });

    console.log('Database loaded successfully')

  } catch (error) {
    console.log(error)
    res.send(error);
  }
}

module.exports = { LoadingDb }