const { User } = require("../db");

const deleteUser = async function (id) {
    if (!id) {
        throw new Error('You must enter the User to delete')
    }
    const searchUser = await User.findOne({
        where: {
            id: id,
        },
    });
    if (!searchUser) {
        throw new Error(`The product ${id} cannot be found to delete`)
    } else {
        await User.destroy({
            where: {
                id: id
            }
        })
        return `The User ${id} was successfully removed`
    }
}
module.exports = { deleteUser };