
module.exports = app => {
    const  actualite = require("../controllers/ActualiteController");

    // Retrieve all Actualité
    app.get("/api/public/actualite", actualite.findAllActualite);
    // Retrieve Actualité by Id
    app.get("/api/public/actualite/:id", actualite.findOne);
    // Get the number of the row in actualite table
    app.get("/api/public/actualitecount", actualite.getTotalOfActualite);
}
