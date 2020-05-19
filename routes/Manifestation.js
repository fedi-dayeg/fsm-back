
module.exports = app => {
    const manifestation = require("../controllers/Manifestations");
    app.get("/api/public/manifestation" ,manifestation.findAllManifestations);
    app.get("/api/public/manifestationtitle", manifestation.getManifestationByTitle);
    app.get("/api/public/manifestation/:id", manifestation.findOne);
}

