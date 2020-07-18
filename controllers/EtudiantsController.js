    const Etudiants = require('../models/Etudiants');
    const jwt = require('jsonwebtoken');
    const config = require('../config/config');
    const bcrypt = require('bcryptjs');
    const constants = require('../config/constants');
    const asyncHandler = require('../middleware/async');

    exports.create = (req, res) => {
        if (!req.body) {
            res.status(400).send({
                message: "Content can not be empty!"
            });
        }


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
            activate: req.body.activate
        });

        Etudiants.verifEtudiantByEmail(etudiants.email, (err, data) =>{
            if (err) {
                res.send(err);
            }
            else if (data.length > 0) {
                res.json({
                    error: true,
                    message: 'email existe déjà ',
                });
            }
            else {
                Etudiants.create(etudiants, (err, data) => {
                    if (err) {
                        res.status(500).send({
                            message: err.message || "Some error occurred while creating the Admin."
                        });
                    } else
                        res.send(data);
                });
            }
        })

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




    exports.updateEtudiantActive = asyncHandler((req, res) => {
        //Valide Request
        if(!req.body) {
            res.status(400).json({
                message: "Admin can not be empty!"
            });
        }
        Etudiants.updateEtudiantActive(req.params.id,
            (err, data) => {
                if(err) {
                    if(err.kind === "not find") {
                        res.status(404).json({
                            message: `Not Found Etudiant with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).json({
                            message: "Error update Etudiants with Id " + req.params.id
                        });
                    }
                } else res.json(data);
            });
    });


    exports.findAllEtudiants = asyncHandler(async (req, res) => {
        await Etudiants.getAll((err, data) => {
            if (err) {
                res.status(500).send({
                    success: false,
                    message: err.message || "Some Error Occured while retrive."
                });
            } else {
                res.status(200).send({
                    success: true,
                    message: "success",
                    data: data
                });
            }
        });
    })


    exports.deleteEtudiants = asyncHandler ( async (req, res) => {
        await Etudiants.deleteEtudiants(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not_found") {
                    res.status(404).json({
                        message: `Not found Etudiants with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).json({
                        message: "Could not delete Etudiants with id " + req.params.id
                    });
                }
            } else res.json({ message: `Etudiants was deleted successfully!` });
        })
    });


    exports.updateEtudiantById = asyncHandler((req, res) => {
        //Valide Request
        if(!req.body) {
            res.status(400).json({
                message: "Etudiants can not be empty!"
            });
        }
        Etudiants.updateEtudiantById(req.params.id, new Etudiants(req.body),
            (err, data) => {
                if(err) {
                    if(err.kind === "not find") {
                        res.status(404).json({
                            message: `Not Found Etudiants with id ${req.params.id}.`
                        });
                    } else {
                        res.status(500).json({
                            message: "Error update Etudiants with Id " + req.params.id
                        });
                    }
                } else res.json(data);
            });
    });



    exports.findEtudiants = asyncHandler(async (req, res) => {
        await Etudiants.findEtudiantsById(req.params.id, (err, data) => {
            if (err) {
                if (err.kind === "not Found") {
                    res.status(404).json({
                        message: `Not found Etudiants with id ${req.params.id}.`
                    });
                } else {
                    res.status(500).json({
                        message: "Error retrieving Etudiants with id " + req.params.id
                    });
                }
            } else {
                res.status(200).json({
                    success: true,
                    message: "Success",
                    data: data
                });
            }
        });
    });
