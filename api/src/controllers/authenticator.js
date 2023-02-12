const { User } = require("../db");
const authenticator = async function (email, token, rol, fullname) {
  
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
              passwordToken:token,
              rol:rol,
              fullname:fullname
          });
      return newUser
    } else {
      return searchUser
    }
  }
  module.exports = { authenticator };