
module.exports = app => {
    const  actualite = require("../controllers/ActualiteController");
    // Put new Actualite
    app.post("/api/public/addactualite", actualite.putActualite)
    // Retrieve all Actualité
    app.get("/api/public/actualite", actualite.findAllActualite);
    // Retrieve Actualité by Id
    app.get("/api/public/actualite/:id", actualite.findOne);
    // Get the number of the row in actualite table
    app.get("/api/public/actualitecount", actualite.getTotalOfActualite);
    // Retrieve all Actualité with no Limit
    app.get("/api/public/getallactualite", actualite.findAllAct);
    // Delete a Actualite with Id
    app.delete("/api/public/actualiteact/:id", actualite.deleteAct);
    //Update Actualite by his Id
    app.put("/api/public/updateact/:id", actualite.updateAct);
}
