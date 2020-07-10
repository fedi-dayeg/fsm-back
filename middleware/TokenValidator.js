const jwt = require('jsonwebtoken');
const  constants = require('../config/constants');


module.exports =  (req, res, next) => {
    //On met le token soit en param de l'url avec ?
    //Avec la méthode post on le met dans le body dans la partie ou on met les values avec comme clé token
    //ou on le met en header avec x-access-token et la valeur du token.

    const token = req.body.token || req.query.token  || req.headers["authorization"];
    /*const token = req.headers.authorization.split(' ')[1];*/
    //decode token

    if (token) {
        //verifies secret and check exp
        jwt.verify(token,global.config.mysecret,  (err, decode) => {
            if (err) {
                console.log(decode);
                return res.status(constants.HTTP_UNAUTHORIZED).json({
                    token: token,
                    message_error: err.message,
                    "error": true,
                    "error_code": constants.INVALID_TOKEN,
                    "message": 'Token non valide '

                });

            }
            req.decode = decode;
            console.log(req.decode = decode);
            next();
        });
    } else {
        // if there is no token
        //return ERROR
        return res.status(constants.HTTP_ACCESS_DENIED).json({
            "error": true,
            "error_code": constants.NO_TOKEN_PROVIDED,
            "message": 'Aucun token fournis, Accès aux ressources interdi'
        });
    }

}
