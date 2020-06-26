const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const ActualiteController = require('../models/Actualite');

// @desc    Add newl Actualité
// @route   put/api/public/actualite
// @access  Public

exports.putActualite = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const actualites = new ActualiteController({
        titre: req.body.titre,
        date: req.body.date,
        description: req.body.description
    });
    ActualiteController.AddActualite(actualites, (err, data) => {
        if (err) {
            console.log(actualites);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Customer."
            });
        }
        else res.send(data);
    });
}

// @desc    Get All Actualité
// @route   Get /api/public/actualite
// @access  Public
exports.findAllActualite = asyncHandler(async (req, res) => {
    await ActualiteController.getAll((err, data) => {
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


// @desc    Get All Actualité with no LIMIT
// @route   Get /api/public/actualite
// @access  Public
exports.findAllAct = asyncHandler(async (req, res) => {
    await ActualiteController.getAllAct((err, data) => {
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


// @desc    Find Actualité by her Id
// @route   Get /api/public/actualite/:id
// @access  Public
exports.findOne = asyncHandler(async (req, res) => {
    await ActualiteController.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Actualite with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving ActualiteController with id " + req.params.id
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

// @desc    Get All Number of row in the DB
// @route   Get /api/public/actualitecount
// @access  Public
exports.getTotalOfActualite = asyncHandler(async (req, res, next) => {
    await ActualiteController.getTotalActualite((err, data) => {
        if (err) {
            return new ErrorResponse(`error occured`, 500);
        } else {
            res.status(200).json({
                success: true,
                message: "Success",
                data: data
            });
        }
    });
});

// @desc    Delete Actualite From DB
// @route   Get /api/public/deleteact
// @access  Public

exports.deleteAct = asyncHandler ( async (req, res) => {
   await ActualiteController.deleteActualite(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found Actualite with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete Customer with id " + req.params.customerId
                });
            }
        } else res.json({ message: `Actualite was deleted successfully!` });
    })
})


// @desc    Update Actualite From DB
// @route   Get /api/public/updateact
// @access  Public

exports.updateAct = asyncHandler((req, res) => {
    //Valide Request
    if(!req.body) {
        res.status(400).json({
            message: "Actualite can not be empty!"
        });
    }
     console.log(req.body);
        ActualiteController.updateActualiteById(req.params.id, new ActualiteController(req.body),
        (err, data) => {
        if(err) {
            if(err.kind === "not find") {
                res.status(404).json({
                    message: `Not Found Actualite with if ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error update Actualite with Id " + req.params.id
                });
            }
        } else res.json(data);
        });
});
