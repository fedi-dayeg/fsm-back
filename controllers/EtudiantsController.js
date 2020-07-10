const Etudiants = require('../models/Etudiants');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const constants = require('../config/constants');

/*exports.create_Etudiants =  (req, res) => {
    const newEtudiants = new Etudiants(req.body);

    if (!newEtudiants.nom || !newEtudiants.prenom || !newEtudiants.cin || !newEtudiants.etat || !newEtudiants.grade ||
    !newEtudiants.dateInscription || !newEtudiants.email || !newEtudiants.password || !newEtudiants.etablissement ||
    !newEtudiants.universite || !newEtudiants.create_date || !newEtudiants.last_update) {
        res.status(constants.HTTP_BAD_REQUEST).json({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs'
        });
    } else {
        Etudiants.getEtudiantByEmail(newEtudiants.email,  (err, etudiants) => {
            if (err) {
                res.send(err);
            } else  if (etudiants.length > 0) { //email Etudiant trouver dans la BD
                res.json({
                    error: true,
                    error_code: constants.EMAIL_ALREADY_EXISTS,
                    message: 'L\'email  ' + newEtudiants.email + ' existe déjà ',
                });
            } else { //l'email n'existe pas dans le base
                Etudiants.createEtudiants(newEtudiants,  (err, etudiants) => {
                    if (err) {
                        res.send(err);
                    } else {
                        console.log(etudiants);
                        // Generaion du token pour sécurité api
                        const token = jwt.sign(etudiants, 'fedidayeg');
                        res.status(constants.HTTP_CREATED).json({
                            error: false,
                            error_code: constants.SUCCESSFULLY_COMPLETED,
                            message: ' Création de ' + newEtudiants.nom.toUpperCase() + ' effectuer avec succès ! ',
                            etudiants,
                            token
                        });
                    }
                });
                 }
        });
    }

}*/

exports.create = (req, res) => {
    const etudiants = new Etudiants({
        nom: req.body.nom,
        prenom: req.body.prenom,
        cin: req.body.cin,
        etat: req.body.etat,
        grade: req.body.grade,
        dateInscription: req.body.dateInscription,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        etablissement: req.body.etablissement,
        universite: req.body.universite,
        create_date: req.body.create_date,
        last_update: req.body.last_update
    });
    if (!req.body) {
        res.status(400).send({
            error: true,
            error_code: constants.EMPTY_FIELDS,
            message: 'Veuillez remplir les champs'
        });
    } else {
        Etudiants.getEtudiantByEmail(etudiants.email, (err, data) => {
            if (err) {
                res.send({
                    message: err.message
                });
            } else if (data.length > 0) { //email Etudiant trouver dans la BD
                res.json({
                    error: true,
                    error_code: constants.EMAIL_ALREADY_EXISTS,
                    message: 'L\'email  ' + etudiants.email + ' existe déjà ',
                });

            } else {
                //Save Etudiant in DB
                Etudiants.create(etudiants, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Etudiant."
                        });
                    } else res.json({
                        data: data
                    });
                });
            }
        });
    }
}

exports.login = (req, res) => {

    if (!req.body) {
        res.status(constants.HTTP_BAD_REQUEST).json({
            error: true,
            message: 'Veuillez remplir les champs'
        });
    }
        Etudiants.getEtudiantByEmail(req.body.email, (err, data) => {

            if (err) {

                if (err.kind === "not_found") {
                    res.status(404).send({
                        message: `Not found user with id ${req.email}.`
                    });
                }
                else {

                    res.status(500).send({
                        message: "Error retrieving user with id " + req.body.email
                    });
                }
            }

                else {
                console.log(data);
                const passwordIsValid = bcrypt.compareSync(
                    req.body.password,
                    data[0].password
                );
                console.log(data[0].password);

                if (!passwordIsValid) {
                    return res.status(constants.HTTP_UNAUTHORIZED).json({
                        token: null,
                        message: "Invalid Password!"
                    });
                }
                const token = jwt.sign({
                        id: data[0].id
                    },
                    config.secret, {
                        expiresIn: 1800
                    });
                console.log(token);
                res.status(constants.HTTP_OK).json({
                    etudiants: {
                        id: data[0].id,
                        email: data[0].email,
                        token: token
                    }
                });
            }
        });

}
