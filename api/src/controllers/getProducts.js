const { Product, Grape, State, Region, Type } = require("../db");

const getProducts = async function (name) {

    const productsAll = await Product.findAll({ include: Grape, State, Region, Type });
    if (!name) {  
        return productsAll;
    } else {
        let searchProduct = await productsAll.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
        if (searchProduct.length === 0) {
            throw new Error(`Product with name ${name} not found `)
        } else {
            return searchProduct;
        }

    }
}

module.exports = { getProducts }