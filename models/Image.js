const connection = require('../config/db');

// Constructor
const Image = function (image) {
    this.idImage = image.idImage;
    this.imagePath = image.imagePath;
    this.idAlbum = image.idAlbum;
}

// add new Image to DB
Image.addImage = (newImage, result) => {
    connection.query('INSERT INTO  image SET ?', newImage, (err, res) => {
        if (err) {
            console.log("error in: ", err);
            result(err, null);
            return;
        }
        console.log("created Album: " ,{idImage: res.idImage, ...newImage});
        result(null, {idImage: res.idImage, ...newImage});
    });
}

// get All the Image From DB
Image.getAllImages = result => {
    connection.query(`SELECT * FROM image`, (err,res) => {
        if (err) {
            console.log("ERROR: ");
            result (null, err);
            return;
        }
        console.log("Image: ", res);
        result(null, res);
    })
}

// Get Image By his Id
Image.findImageById = (idImage, result) => {
    connection.query(`SELECT * FROM image WHERE idImage = ${idImage}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Image Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Maj  with the id
        result({kind: "not Found"}, null);
    })
}

Image.findImageByAlbum = (idAlbum, result) => {
    connection.query(`select imagePath from image A, album B where A.idAlbum = B.idAlbum and B. idAlbum = ${idAlbum}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Found: ", res);
            result(null, res);
            return;
        }
        // Not Found Maj  with the id
        result({kind: "not Found"}, null);
    })
}

module.exports = Image  ;
