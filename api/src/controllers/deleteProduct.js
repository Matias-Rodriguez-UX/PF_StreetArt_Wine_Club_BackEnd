const { Product } = require("../db");

const deleteProduct = async function (id) {
    if (!id) {
        throw new Error('You must enter the product to delete')
    }
    const searchProduct = await Product.findOne({
        where: {
            id: id,
        },
    });
    if (!searchProduct) {
        throw new Error(`The product ${id} cannot be found to delete`)
    } else {
        await Product.destroy({
            where: {
                id: id
            }
        })
        return `The product ${id} was successfully removed`
    }
}
module.exports = { deleteProduct };