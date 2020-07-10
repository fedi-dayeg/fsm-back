const asyncHandler = require('../middleware/async');
const ManifestationsController = require('../models/Manifestation');
const ErrorResponse = require('../utils/errorResponse');


// @desc    Post new  Manifestation
// @route   POST /api/public/manifestations
// @access  Public

exports.postManifestation = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const manifestation = new ManifestationsController({
        titre: req.body.titre,
        date: req.body.date,
        description: req.body.description
    });
    ManifestationsController.AddManifestation(manifestation, (err, data) => {
        if (err) {
            console.log(manifestation);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Manifestation."
            });
        }
        else res.send(data);
    });
}

// @desc    Get All the Manifestation
// @route   Get /api/public/manifestations
// @access  Public
exports.findAllManifestations = asyncHandler(async (req, res, next) => {
    await ManifestationsController.getAll((err, data) => {
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

// @desc    Get the Manifestation Titre
// @route   Get /api/public/manifestationtitle
// @access  Public
exports.getManifestationByTitle = asyncHandler(async (req, res, next) => {
    await ManifestationsController.getTitre((err, data) => {
        if (err) {
            return new ErrorResponse(`Error Occured`, 500);
        } else {
            res.status(200).json({
                success: true,
                message: "Success",
                data: data
            });
        }
    });
});

// @desc    Get the Manifestation by Id
// @route   Get /api/public/manifestation/:id
// @access  Public
exports.findOne = asyncHandler(async (req, res) => {
    await ManifestationsController.findById(req.params.id, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Manifestation with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Manifestation with id " + req.params.id
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
// @route   Get /api/public/manifestations/count
// @access  Public
exports.getTotalOfManifestation = asyncHandler(async (req, res, next) => {
    await ManifestationsController.getTotalManifestations((err, data) => {
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

// @desc    Delete Manifestation From DB
// @route   Get /api/public/deletMan
// @access  Public
exports.deleteMan = asyncHandler ( async (req, res) => {
    await ManifestationsController.deleteManifestation(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found Manifestation with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete Manifestation with id " + req.params.id
                });
            }
        } else res.json({ message: `Manifestation was deleted successfully!` });
    })
})

// @desc    Update Manifestation From DB
// @route   Get /api/public/updatMan
// @access  Public
exports.updateMan = asyncHandler((req, res) => {
    //Valide Request
    if(!req.body) {
        res.status(400).json({
            message: "Manifestation can not be empty!"
        });
    }
    console.log(req.body);
    ManifestationsController.updateManifestationById(req.params.id, new ManifestationsController(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not find") {
                    res.status(404).json({
                        message: `Not Found Manifestation with if ${req.params.id}.`
                    });
                } else {
                    res.status(500).json({
                        message: "Error update Manifestation with Id " + req.params.id
                    });
                }
            } else res.json(data);
        });
});
