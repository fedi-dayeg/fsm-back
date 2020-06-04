const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const ActualiteController = require('../models/Actualite');


// @desc    Get All Actualité
// @route   Get /api/public/actualite
// @access  Public
exports.findAllActualite = asyncHandler(async (req, res) => {
    await ActualiteController.getAll((err, data) => {
        if(err) {
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
        if(err) {
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
