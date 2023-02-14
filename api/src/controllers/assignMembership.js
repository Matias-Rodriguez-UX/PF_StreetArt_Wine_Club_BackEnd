const { Membership, User } = require("../db");

const assignMembership = async function (userId, membershipId ){

    const searchMembership = await Membership.findOne({
                where: {
                    id: membershipId
                },
            })
            const searchUser =  await User.findOne({
                        where: {
                            id: userId,
                        },
                    })
// console.log(searchMembership)
// console.log(searchUser)
await searchUser.setMembership(searchMembership)
return `${searchMembership.name} membership was assigned to the user ${searchUser.email}`
}
    
    module.exports = {assignMembership}