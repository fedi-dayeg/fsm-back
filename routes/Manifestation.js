
module.exports = app => {
    const manifestation = require("../controllers/ManifestationsController");
    app.get("/api/public/manifestation" ,manifestation.findAllManifestations);
    app.get("/api/public/manifestationtitle", manifestation.getManifestationByTitle);
    app.get("/api/public/manifestation/:id", manifestation.findOne);
    app.get("/api/public/manifestationcount" ,manifestation.getTotalOfManifestation);
    // POST new Manifestation
    app.post("/api/public/addmanifestation", manifestation.postManifestation)
    // Delete a Manifestation with Id
    app.delete("/api/public/deletman/:id", manifestation.deleteMan);
    //Update Manifestation by his Id
    app.put("/api/public/updateman/:id", manifestation.updateMan);
}

