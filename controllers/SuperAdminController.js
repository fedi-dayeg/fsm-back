const SuperAdmin = require('../models/SuperAdmin');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const constants = require('../config/constants');


//create new Super Admin
exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    const superadmin = new SuperAdmin({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        nom: req.body.nom,
        prenom: req.body.prenom
    });

    SuperAdmin.verifSuperAdminByEmail(superadmin.email, (err, data) =>{
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
            SuperAdmin.create(superadmin, (err, data) => {
                if (err) {
                    res.status(500).send({
                        message: err.message || "Some error occurred while creating the Super Admin."
                    });
                } else
                    res.send(data);
            });
        }
    })

}


//Login
exports.login = (req, res) => {

    if (!req.body) {
        res.status(constants.HTTP_BAD_REQUEST).json({
            error: true,
            message: 'Veuillez remplir les champs'
        });
    }
    SuperAdmin.getSuperAdminByEmail(req.body.email, (err, data) => {

        if (err) {

            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Super Admin with id ${req.email}.`
                });
            } else {

                res.status(500).send({
                    /*message: "Error retrieving Super Admin with id " + req.body.email*/
                    message: "error"
                });
            }
        } else {
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
            res.status(constants.HTTP_OK).json({
                message: "success",
                id: data[0].id,
                email: data[0].email,
                nom: data[0].nom,
                prenom: data[0].prenom,
                token: token

            });
        }
    });

}
