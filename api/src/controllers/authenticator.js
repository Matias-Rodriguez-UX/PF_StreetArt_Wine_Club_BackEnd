const authenticator = async function (email, token, rol) {
  
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
              token:token,
              rol:rol
          });
      return newUser
    } else {
//    if(token)
      return searchUser
    }
  }
  module.exports = { authenticator };