const asyncHandler = require('../middleware/async');
const Image = require('../models/Image');
const multer = require('multer');
const path = require('path');

// store the image in the public folder
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/image')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let uploads = multer({storage: storage}).single('photo');


// create request API to add new Image
exports.postImage = asyncHandler(async (req, res) => {
    uploads(req, res, function (err) {
        if (err) {
            return res.status(500).json({
                success: false,
                message: 'Error Upload file'
            })
        }
        const image = new Image({
            idImage: req.body.idImage,
            imagePath: req.file.filename,
            idAlbum: req.body.idAlbum,
        })
        Image.addImage(image, function (err, rows) {
            if (err) {
                res.send(err)
            } else {
                res.json({
                    rows
                });
            }
        })
    })
})


// create Response to get All the Image stored in the DB
exports.GetImages = asyncHandler(async (req, res) => {
    await Image.getAllImages((err, data) => {
        if (err) {
            res.status(500).send({
                success: false,
                message: err.message || "Some Error Occured while retrive."
            });

        } else {
            res.status(200).json({
                data
            })
        }
    })
})


// Find Image by Id
exports.findImageById = asyncHandler(async (req, res) => {
    await Image.findImageById(req.params.idImage, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Image with id ${req.params.idImage}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Album with id " + req.params.idImage
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


// Find All Image with the Album Id
exports.findImageByAlbum = asyncHandler(async (req, res) => {
    await Image.findImageByAlbum(req.params.idAlbum, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Image with id ${req.params.idAlbum}.`
                });
            } else {
                res.status(500).json({
                    message: "Error retrieving Album with id " + req.params.idAlbum
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
