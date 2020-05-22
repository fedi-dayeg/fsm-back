
module.exports = app => {
    const  actualite = require("../controllers/Actualite");

    // Retrive all Actualité
    app.get("/api/public/actualite", actualite.findAllActualite);
    app.get("/api/public/actualite/:id", actualite.findOne);
}
