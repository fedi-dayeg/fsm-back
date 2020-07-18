const connection = require('../config/db');

// Constructor
const Album = function (album) {
    this.idAlbum = album.idAlbum;
    this.imageAlbumPath = album.imageAlbumPath;
    this.label = album.label;
    this.dateCreation = album.dateCreation
}

// add new Album to DB
/*
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
*/

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

// Get Album By his Id
Album.findAlbumById = (idAlbum, result) => {
    connection.query(`SELECT * FROM album WHERE idAlbum = ${idAlbum}`, (err, res) => {
        if(err) {
            console.log("Error", err.message);
            result(null, err);
            return;
        }
        if(res.length) {
            console.log("Album Found: ", res[0]);
            result(null, res[0]);
            return;
        }
        // Not Found Maj  with the id
        result({kind: "not Found"}, null);
    })
}

module.exports = Album;
