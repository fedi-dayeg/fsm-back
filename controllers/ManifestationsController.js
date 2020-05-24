const asyncHandler = require('../middleware/async');
const ManifestationsController = require('../models/Manifestation');
const ErrorResponse = require('../utils/errorResponse');

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
