const { Product, Grape, State, Region, Type } = require("../db");

const getProducts = async function (name) {
  const productsAll = await Product.findAll({
    include: [
      {
        model: Grape,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: State,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Region,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Type,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  if (!name) {
    return productsAll;
  } else {
    let searchProduct = await productsAll.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase())
    );
    if (searchProduct.length === 0) {
      throw new Error(`Product with name ${name} not found `);
    } else {
      return searchProduct;
    }
  }
};
module.exports = { getProducts };
