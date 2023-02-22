const { Product, User } = require("../db");

const deleteFavourite = async function (email, id) {
    

    if(!email || !id) return "Mandatory info missing"

    const user = await User.findByPk(email)

    await user.removeProducts(id)

    return user

};


module.exports = {deleteFavourite}