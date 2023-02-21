const { User, Membership } = require("../db");
const authenticator = async function (email, fullname, picture) {
  
  const membership = await Membership.findOrCreate({
      where: {
          name: 'not member',
          discount:0,
          price:0
      },
    });  
    //  console.log(membership)
    //  console.log("soy el id",membership[0].id)
    if (!email ) {
      throw new Error('You must complete email')
    }
    const searchUser = await User.findOne({
      where: {
          email: email,
      },
    });
      if (!searchUser) {
          const newUser = await User.create({
              email: email,
              fullname : fullname,
              avatar: picture,
              membershipId: membership[0].id
          });
      return newUser
    } else {
      return searchUser
    }
  }
  module.exports = { authenticator };