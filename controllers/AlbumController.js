const asyncHandler = require('../middleware/async');
const Album = require('../models/Album');
const multer = require('multer');
const path = require('path');

// store the image in the public folder
/*
let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/image')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + Date.now() + path.extname(file.originalname))
    }
})

let uploads = multer({storage: storage}).single('photo');

// create request API to add new Album
exports.postAlbum = asyncHandler(async (req, res) => {
    uploads(req, res, function (err) {
        if (err) {

            return res.status(500).json({
                success: false,
                message: 'Error Upload file'
            })

        }
        const album = new Album({
            idAlbum: req.body.idAlbum,
            imageAlbumPath: req.file.filename,
            label: req.body.label,
            dateCreation: req.body.dateCreation
        })
        Album.addAlbum(album, function (err, rows) {
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
*/



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
exports.postAlbum = asyncHandler(async (req, res) => {
    uploads(req, res, function (err) {
        if (err) {
           /* return res.status(500).json({
                success: false,
                message: 'Error Upload file'
            })*/
          return  console.log(req.body.label);
        }
        const album = new Album({
            idAlbum: req.body.idAlbum,
            imageAlbumPath: req.file.filename,
            label: req.body.label,
            dateCreation: req.body.dateCreation
        })
        Album.addAlbum(album, function (err, rows) {
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


// create Response to get All the Album stored in the DB
exports.GetAlbums = asyncHandler(async (req, res) => {
    await Album.getAllAlbum((err, data) => {
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


/*  */
exports.findAlbumById = asyncHandler(async (req, res) => {
    await Album.findAlbumById(req.params.idAlbum, (err, data) => {
        if(err) {
            if (err.kind === "not Found") {
                res.status(404).json({
                    message: `Not found Album with id ${req.params.idAlbum}.`
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
