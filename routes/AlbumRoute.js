module.exports = app => {
    const  album = require("../controllers/AlbumController");

    // Add new Album
    app.post("/api/public/album", album.postAlbum);
    // Get All the Album
    app.get("/api/public/albums", album.GetAlbums);
    //Find Album By Id
    app.get("/api/public/album/:idAlbum", album.findAlbumById);

}
