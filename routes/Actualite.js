
module.exports = app => {
    const  actualite = require("../controllers/Actualite");

    // Retrieve all Actualité
    app.get("/api/public/actualite", actualite.findAllActualite);
    // Retrieve Actualité by Id
    app.get("/api/public/actualite/:id", actualite.findOne);
}
