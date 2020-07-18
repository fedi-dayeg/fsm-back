const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const bcrypt = require('bcryptjs');
const constants = require('../config/constants');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }


    const admin = new Admin({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
        nom: req.body.nom,
        prenom: req.body.prenom
    });

    Admin.verifAdminByEmail(admin.email, (err, data) =>{
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
            Admin.create(admin, (err, data) => {
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
    Admin.getAdminByEmail(req.body.email, (err, data) => {

        if (err) {

            if (err.kind === "not_found") {
                res.status(404).send({
                    /*message: `Not found Admin with id ${req.email}.`*/
                    message: "error"
                });
            } else {

                res.status(500).send({
                    //message: "Error retrieving Admin with id " + req.body.email
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

                    id: data[0].id,
                    email: data[0].email,
                    nom: data[0].nom,
                    prenom: data[0].prenom,
                    token: token

            });
        }
    });

}

exports.findAllAdmin = asyncHandler(async (req, res) => {
    await Admin.getAll((err, data) => {
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



// @desc    Delete Admin From DB
// @route   Get /api/public/deleteadm
// @access  Public

exports.deleteAdmin = asyncHandler ( async (req, res) => {
    await Admin.deleteAdmin(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found Admin with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete Admin with id " + req.params.id
                });
            }
        } else res.json({ message: `Admin was deleted successfully!` });
    })
});


exports.updateAdmin = asyncHandler((req, res) => {
    //Valide Request
    if(!req.body) {
        res.status(400).json({
            message: "Admin can not be empty!"
        });
    }
    Admin.updateAdminById(req.params.id, new Admin(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not find") {
                    res.status(404).json({
                        message: `Not Found Admin with if ${req.params.id}.`
                    });
                } else {
                    res.status(500).json({
                        message: "Error update Admin with Id " + req.params.id
                    });
                }
            } else res.json(data);
        });
});


// @desc    Find Admin by Id
// @route   Get /api/public/admin/:id
// @access  Public
exports.findAdmin = asyncHandler(async (req, res) => {
    await Admin.findAdminById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Admin with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Admin with id " + req.params.id
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
