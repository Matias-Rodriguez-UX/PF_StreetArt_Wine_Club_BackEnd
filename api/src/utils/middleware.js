function isAuthenticated(req, res, next) {
	if (req.user) next();
	else res.sendStatus(401)
};
// console.log(req.user)
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