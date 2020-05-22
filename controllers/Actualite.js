const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Actualite = require('../models/Actualite');


// @desc    Get All Actualité
// @route   Get /api/public/actualite
// @access  Public
exports.findAllActualite = asyncHandler(async (req, res) => {
    await Actualite.getAll((err, data) => {
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


exports.findOne = asyncHandler(async (req, res) => {
    await Actualite.findById(req.params.id, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Actualite with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Actualite with id " + req.params.id
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
