module.exports = app => {
    const  album = require("../controllers/AlbumController");

    // Add new Album
    app.post("/api/public/album", album.postAlbum);
    app.get("/api/public/albums", album.GetAlbums);

}
