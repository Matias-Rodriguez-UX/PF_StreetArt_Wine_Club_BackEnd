const { Membership, User } = require("../db");

const assignMembership = async function (userId, idMembership) {
    if (!userId || !idMembership.length) return "Mandatory info missing"
    const searchMembership = await Membership.findAll({
        where: {
            id: idMembership

        },
    })
    const searchUser = await User.findOne({
        where: {
            id: userId,
        },
    })
    // console.log(searchMembership)
    // console.log(searchUser)
    await searchUser.setMemberships(searchMembership)
    return `${searchMembership.id} membership was assigned to the user ${searchUser.email}`
}

module.exports = { assignMembership }