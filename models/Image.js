const connection = require('../config/db');

// Constructor
const Image = function (image) {
    this.idImage = image.idImage;
    this.image = image.image;
    this.idAlbum = image.idAlbum;
}

// add new Image to DB
Image.addImage = (newAlbum, result) => {
    connection.query('INSERT INTO  image SET ?', newAlbum, (err, res) => {
        if (err) {
            console.log("error in: ", err);
            result(err, null);
            return;
        }
        console.log("created Album: " ,{idAlbum: res.idAlbum, ...newAlbum});
        result(null, {idAlbum: res.idAlbum, ...newAlbum});
    });
}
