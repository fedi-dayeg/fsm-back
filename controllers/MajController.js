const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const MajController = require('../models/Maj');


// @desc    Post new  Maj
// @route   POST /api/public/maj
// @access  Public

exports.postMaj = (req, res) => {

    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    const maj = new MajController({
        titre: req.body.titre,
        date: req.body.date,
        descriptions: req.body.descriptions
    });
    MajController.AddMaj(maj, (err, data) => {
        if (err) {
            console.log(maj);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Maj."
            });
        }
        else res.send(data);
    });
}

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


// @desc    Delete Maj From DB
// @route   Get /api/public/deletMaj
// @access  Public
exports.deleteMaj = asyncHandler ( async (req, res) => {
    await MajController.deleteMaj(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).json({
                    message: `Not found Maj with id ${req.params.id}.`
                });
            } else {
                res.status(500).json({
                    message: "Could not delete Maj with id " + req.params.id
                });
            }
        } else res.json({ message: `Maj was deleted successfully!` });
    })
})


// @desc    Update Maj From DB
// @route   Get /api/public/updatMaj
// @access  Public
exports.updateMaj = asyncHandler((req, res) => {
    //Valide Request
    if(!req.body) {
        res.status(400).json({
            message: "Maj can not be empty!"
        });
    }
    console.log(req.body);
    MajController.updateMaj(req.params.id, new MajController(req.body),
        (err, data) => {
            if(err) {
                if(err.kind === "not find") {
                    res.status(404).json({
                        message: `Not Found Maj with if ${req.params.id}.`
                    });
                } else {
                    res.status(500).json({
                        message: "Error update Maj with Id " + req.params.id
                    });
                }
            } else res.json(data);
        });
});


// @desc    Get All the Maj
// @route   Get /api/public/maj
// @access  Public
exports.findAll = asyncHandler(async (req, res, next) => {
    await MajController.getAllMaj((err, data) => {
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
