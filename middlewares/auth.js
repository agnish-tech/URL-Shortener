const { getUser } = require("../service/auth");

function checkForAuthentication(req, res, next) {
    const authorizationHeaderValue = req.cookies?.uid;
    req.user = null;
    if (!authorizationHeaderValue) {
        return next();
    }
    const user = getUser(authorizationHeaderValue);
    if (!user) {
        return next();
    }
    req.user = user;
    next();
}

function restrictTo(roles) {
    return (req, res, next) => {
        if (!req.user) {
            return res.redirect("/login");
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    };
}
//     }
//     const user = getUser(UserUid);
//     if (!user) {
//         return res.redirect("/login");
//     }

//     req.user = user;
//     next();
// }

// async function checkAuth(req, res, next) {
//     const UserUid = req.cookies.uid;

//     const user = getUser(UserUid);

//     req.user = user;
//     next();
// }

module.exports = {
    checkForAuthentication,
    restrictTo,
    // restrictToLoggedinUserOnly,
    // checkAuth,
}