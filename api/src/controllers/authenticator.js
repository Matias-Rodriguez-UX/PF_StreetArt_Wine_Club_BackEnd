const { User } = require("../db");
const authenticator = async function (email, fullname, picture) {
  
    if (!email ) {
      throw new Error('You must complete email')
    }
    const searchUser = await User.findOne({
      where: {
          email: email,
      },
    });  
    console.log(searchUser)
      if (!searchUser) {
          const newUser = await User.create({
              email: email,
              fullname : fullname,
              avatar: picture
          });
      return newUser
    } else {
      return searchUser
    }
  }
  module.exports = { authenticator };