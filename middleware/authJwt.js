const jwt = require('jsonwebtoken');
const config =  require('../config/config');

verifyToken = (req,res, next) => {
    //let token = req.headers["authorization"] || req.body.token;
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(403).json({
            error: true,
            message: "No token provided!"
        });
    }
    jwt.verify(token, config.secret, (err,decoded) => {
        if (err) {
            return res.status(401).json({
                error: true,
                message: "Unauthorized!"
            });
        }
        req.etudiantsData = decoded.etudiantsData;
        console.log('req.etudiantsId', req.email,  "decoded.id", decoded.email);
        next();
    });
};

const authJwt = {
    verifyToken: verifyToken
};
module.exports = authJwt;
