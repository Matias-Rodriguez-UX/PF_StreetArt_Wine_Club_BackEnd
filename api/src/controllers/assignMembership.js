const { Membership, User } = require("../db");

const assignMembership = async function (userId, membershipId) {
    if (!userId || !membershipId.length) return "Mandatory info missing"
    const searchMembership = await Membership.findAll({
        where: {
            id: membershipId
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