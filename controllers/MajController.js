const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const MajController = require('../models/Maj');


// @desc    Get All Maj
// @route   Get /api/public/maj
// @access  Public
exports.findAllMaj = asyncHandler(async (req, res) => {
    await MajController.getAll((err, data) => {
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

// @desc    Find Maj by her Id
// @route   Get /api/public/maj/:id
// @access  Public
exports.findOne = asyncHandler(async (req, res) => {
    await MajController.findById(req.params.id, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Maj with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Maj with id " + req.params.id
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
// @route   Get /api/public/majcount
// @access  Public
exports.getTotalOfMaj = asyncHandler(async (req, res, next) => {
    await MajController.getTotalMaj((err, data) => {
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
