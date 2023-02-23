const { User, Membership, ShoppingCart, Order, Review } = require("../db");

const getUserByEmail = async function (email) {
    if (email) {

        const user = await User.findOne({
            where: {
                email: email,
            },
            include:
                [{ model: Review },
                { model: Membership },
                { model: ShoppingCart },
                { model: Order }
                ]
        })
        if (user) {
            return user
        } else {
            return "User is not registered in the database"
        }
    } else {
        const allUsers = await User.findAll(
            {
                include:
                    [
                        {
                            model: Membership,
                            attributes: ["name"],
                            through: {
                                attributes: [],
                            },
                        },
                    ]
            }
        )
        return allUsers;
    }

}

module.exports = { getUserByEmail }