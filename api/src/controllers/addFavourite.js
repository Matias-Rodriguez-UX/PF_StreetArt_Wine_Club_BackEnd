const { Product, User } = require("../db");

const addFavourite = async function (email, id) {
    

    if(!email || !id) return "Mandatory info missing"

        

        const [instance, created] = await User.findOrCreate({
            where:{email: email},
        })

        await instance.addProducts(id)

        return (instance)
};


module.exports = {addFavourite}