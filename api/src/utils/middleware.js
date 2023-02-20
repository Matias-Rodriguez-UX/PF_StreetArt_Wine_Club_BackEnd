const { User } = require("../db");

async function isAuthenticated(req, res, next) {
  const user = await req.headers;
	if (user){
		const email = await JSON.parse(user.authorization) && next();
	}
	else res.sendStatus(401).json({message:"no puedes acceder"})
};

async function isAdmin(req, res, next) {
  const user = await req.headers;
  const email = await JSON.parse(user.authorization);
  let newuser = await User.findOne({where: {email:email}})
	if (newuser.role === "admin" || newuser.role === "superAdmin") next();
	else res.sendStatus(403).json({message:"no puedes acceder"})
};

async function isSuperAdmin(req, res, next) {
	const user = await req.headers;
	const email = await JSON.parse(user.authorization);
	let newuser = await User.findOne({where: {email:email}})
	  if (newuser.role === "superAdmin") next();
	  else res.sendStatus(403).json({message:"no puedes acceder"})
};

module.exports = {
	isAuthenticated,
	isAdmin,
	isSuperAdmin
};