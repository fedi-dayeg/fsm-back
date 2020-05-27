const connection = require('../config/db');

// Constructor
const Album = function (album) {
    this.idAlbum = album.idAlbum;
    this.image = album.image;
    this.label = album.label;
    this.dateCreation = album.dateCreation
}

// add new Album to DB
Album.addAlbum = (newAlbum, result) => {
    connection.query('INSERT INTO  album SET ?', newAlbum, (err, res) => {
        if (err) {
            console.log("error in: ", err);
            result(err, null);
            return;
        }
        console.log("created Album: " ,{idAlbum: res.idAlbum, ...newAlbum});
        result(null, {idAlbum: res.idAlbum, ...newAlbum});
    });
}

// get All album in the DB
Album.getAllAlbum = result => {
    connection.query(`SELECT * FROM album`, (err,res) => {
        if (err) {
            console.log("ERROR");
            result (null, err);
            return;
        }
        console.log("Album: ", res);
        result(null, res);
    })
}

//

module.exports = Album;
