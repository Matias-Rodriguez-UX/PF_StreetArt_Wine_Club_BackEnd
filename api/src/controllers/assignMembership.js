const { Membership, User } = require("../db");

const assignMembership = async function (userId, membershipId ){
    if(!userId || !membershipId) return "Mandatory info missing"
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
await searchUser.addMemberships(searchMembership)
return `${searchMembership.name} membership was assigned to the user ${searchUser.email}`
}
    
    module.exports = {assignMembership}