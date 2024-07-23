const jwt = require("jsonwebtoken");

function getJwtToken(id) {
    const token = jwt.sign({id}, process.env.JWT_KEY,
        {
            expiresIn: "1d"
        });
    return token;
}

module.exports = getJwtToken;