const { Sequelize } = require("sequelize");
const { Product, Grape, Type, Region, State, Review } = require("../db");

const productById = async function(productId){
    if(productId === null){
        throw new Error('You must enter an id')
      }
      const findProduct = await Product.findOne({
        where: {
          id: productId,
        },include: [{ 
          model: Grape, 
          attributes: ["name"],
          through: { attributes: [] }},
          { 
            model: Type, 
            attributes: ["name"],
            through: { attributes: [] }
          },
          { 
            model: Region, 
            attributes: ["name"],
            through: { attributes: [] }
          },
          { 
            model: State, 
            attributes: ["name"],
            through: { attributes: [] }
          },
          { model: Review },
        ]
        })
          
      
      if(findProduct){
         return findProduct;
      }else{
        throw new Error(`The wine with the id ${productId} does not exist in the database`)
      }
} 

module.exports = { productById };
