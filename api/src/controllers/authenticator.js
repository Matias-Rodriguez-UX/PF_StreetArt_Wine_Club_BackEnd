const { User, Membership } = require("../db");
const { emailUser } = require("./email");
const authenticator = async function (email, fullname, picture, role, birthdate) {
  console.log(email, fullname, picture, role, birthdate)
  const membership = await Membership.findOrCreate({
    where: {
      name: 'not member',
      discount: 0,
      price: 0
    },
  });
  console.log(membership)
  //  console.log("soy el id",membership[0].id)
  if (!email) {
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
      fullname: fullname,
      avatar: picture,
      role: role,
      birthdate: birthdate
    });

    await newUser.addMemberships(membership[0])
    await emailUser(email, fullname)
    return newUser
  } else {
    return searchUser
  }
}
module.exports = { authenticator };
