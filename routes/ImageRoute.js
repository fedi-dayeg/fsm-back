module.exports = app => {
    const  image = require("../controllers/ImageController");

    // Add new Image
    app.post("/api/public/image", image.postImage);
    // Get all Images
    app.get("/api/public/images", image.GetImages);
    //Find Image By Id
    app.get("/api/public/image/:idImage", image.findImageById);
    // find Images with the Album Id
    app.get("/api/public/images/:idAlbum", image.findImageByAlbum);
}
