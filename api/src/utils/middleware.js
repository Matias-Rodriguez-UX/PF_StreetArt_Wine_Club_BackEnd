function isAuthenticated(req, res, next) {
	console.log(req.body.user)
	if (req.user) next();

	else res.sendStatus(401).json({message:"no puedes acceder"})
};

function isAdmin(req, res, next) {
	if (req.user.role === "admin") next();
	else res.sendStatus(403)
};

function isSuperAdmin(req, res, next) {
	if (req.user.role === "superAdmin") next();
	else res.sendStatus(403)
};

module.exports = {
	isAuthenticated,
	isAdmin,
	isSuperAdmin
};