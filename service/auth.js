const jwt = require("jsonwebtoken");
const secret = "Agnish@123";

function setUser(user){
    // const payload = {
    //     id: id,
    //     ...user,
    // }
    const token = jwt.sign({
        id: user._id, 
        email: user.email,
        role: user.role || "NORMAL",
    },
        secret);
    return token;
}

function getUser(token){
    if (!token) return null;
    const payload = jwt.verify(token, secret);
    return payload;
}   


module.exports = {
    setUser,
    getUser
}