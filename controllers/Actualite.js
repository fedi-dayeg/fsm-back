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
