const { Product, User } = require("../db");

const getFavourites = async function (email) {
  try {
    return await User.findOne({
        where:{
            email
        },
        include: {
            model: Product,
            attributes: ["name", "price", "image", "winery", "id"],
            through: {
                attributes: []
            }
        }
    })
  } catch (error){
    return error;
  }
}

module.exports = { getFavourites };
